# form-master
Automatic form generator

## 设计思路

按照设计表单、发布表单、填写表单、收集表单数据的实际操作流程来思考本表单生成器应该具备的基本能力和特性。

### 1.表单设计阶段

【√】此阶段考虑如何高效、可扩展地存储表单结构与操作逻辑。

描述一个常规表单的数据应该包括：
1. 表单项【重点】

   包括名称（label）、描述、 提示信息、数据类型。

2. 依赖的数据源（下拉框数据、自动完成数据等）。
3. 表单项之间还可能会有响应式的关联关系，比如字段B需要根据字段A的值显示或隐藏。
4. 校验信息
5. ~~UI 信息~~ 本项目主张 UI 由独立布局引擎实现


初步存储方案：

- 针对表单项的基本数据存储（字段标签、类型、限定信息等）在 Json Schema 中。
- 字段间的关联关系单独存储在 schema 的自定义字段中
- ~~表单项 UI 描述可以存储在两个地方：Schema 中自定义UI描述、独立的通用 UI 描述文件【表单组件的 props 集合】~~
- 将表单依赖的数据源（自动完成、下拉框、多选/单选选项等数据）独立存储。

存储为 json 文件，格式如下：
```json
{
   "dataSource": [],
   "validators": [],
   "fieldSchema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "0",
      "type": "object",
      "properties": {
         "name": {
            "$id": "0",
            "type": "string",
            "x-component": {
               "name": "input"
            }
         },
         "age": {
            "$id": "1",
            "type": "number",
            "x-component": {
               "name": "input"
            },
            "x-validator": "$$validatorId"
         }
      }
   },
   "reactions": []
}
```

### 2.发布表单

   【此阶段思考表单全量数据的存储、分发】
   TODO

### 3.填写表单

   【此阶段思考如何渲染表单UI、还原操作逻辑】
   TODO

### 4.数据收集

   【此阶段考虑表单填写内容如何存储】
   TODO
