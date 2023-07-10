import { onUnmounted } from "vue";

export function useWindowResizeHandler(fn: (...args: any[]) => any) {
    window.addEventListener('resize', fn)

    onUnmounted(() => {
        window.removeEventListener('resize', fn)
    })
}
