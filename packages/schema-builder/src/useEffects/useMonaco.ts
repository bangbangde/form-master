import * as monaco from "monaco-editor";
import {onMounted, onUnmounted} from "vue";

//@ts-ignore
self.MonacoEnvironment = {
    getWorker: async function (workerId, label) {
        let worker

        switch (label) {
            case 'json':
                worker = await import('monaco-editor/esm/vs/language/json/json.worker?worker');
                break;
            case 'css':
            case 'scss':
            case 'less':
                worker = await import('monaco-editor/esm/vs/language/css/css.worker?worker');
                break;
            case 'html':
            case 'handlebars':
            case 'razor':
                worker = await import('monaco-editor/esm/vs/language/html/html.worker?worker');
                break;
            case 'typescript':
            case 'javascript':
                worker = await import('monaco-editor/esm/vs/language/typescript/ts.worker?worker');
                break;
            default:
                worker = await import('monaco-editor/esm/vs/editor/editor.worker?worker');
        }

        return new worker.default()
    }
};

export function useMonaco(selector: string, options: monaco.editor.IStandaloneEditorConstructionOptions): Promise<monaco.editor.IStandaloneCodeEditor> {
    let instance: monaco.editor.IStandaloneCodeEditor

    return new Promise((resolve, reject) => {
        onMounted(() => {
            const el = document.querySelector(selector)
            if (el) {
                instance = monaco.editor.create(el as HTMLElement, {
                    value: "",
                    language: 'javascript',
                    minimap: {
                        enabled: false
                    },
                    ...options
                })
                return resolve(instance)
            }
            return reject(new Error())
        });

        onUnmounted(() => {
            if (instance) {
                instance.dispose()
            }
        });
    })
}
