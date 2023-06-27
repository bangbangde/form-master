# JSON Schema

JSON Schema 是一种声明性语言，允许您对 JSON 文档进行注释和验证，可以确保对 JSON 数据格式的使用具有可靠性和确定性。

## 起步

### Schema
- 被校验、描述的 JSON document 叫做 `instance`（实例）;
- 包含描述信息的 JSON document 叫做 `schema`(模式)

最基本的模式是一个空的JSON对象，它不限制任何内容，允许任何值，并且不描述任何东西。

### 声明版本
不是必须的，但推荐声明

```json
{ "$schema": "https://json-schema.org/draft/2020-12/schema" }
```

### 唯一标识符
不是必须的，但推荐声明

```json
{ "$id": "http://yourdomain.com/schemas/myschema.json" }
```

### 验证关键字
你可以通过向模式中添加**验证关键字**来对实例应用约束。

例如，"type"关键字可以用于限制实例为：

对象（object）、数组（array）、字符串（string）、数字（number）、布尔值（boolean）或空值（null）：

```json
{
  "type": "object"
}
```


## Schema 参考

### # "type"
类型声明关键字: `"type"`，支持的 `value` 有：
- string
- number
- integer
- object
- array
- boolean
- null

某些类型还有与之相关的关键字提供进一步约束

#### type:string
```json
{
  "type": "string",
  "minLength": 2,
  "maxLength": 3,
  "pattern": "^(\\([0-9]{3}\\))?[0-9]{3}-[0-9]{4}$",
  "format": "date"
}
```

#### type:number
```json
{
  "type": "number",
  "multipleOf": 10,
  "minimum": 0,
  "exclusiveMinimum": 0,
  "maximum": 100,
  "exclusiveMaximum": 100
}
```

#### type:integer
```json
{
  "type": "integer",
  "multipleOf": 10,
  "minimum": 0,
  "exclusiveMinimum": 0,
  "maximum": 100,
  "exclusiveMaximum": 100
}
```

#### type:object
```json
{
  "type": "object",
  "properties": {
    "number": { "type": "number" },
    "street_name": { "type": "string" },
    "street_type": { "enum": ["Street", "Avenue", "Boulevard"] }
  }
}
```
> ⬆️ 这里的 enum 关键字表示指示一个枚举字段
> 
> 默认被校验的 json 对象可以多也可以少字段，但和 properties 匹配的字段必须符合 schema 要求。


```json
{
  "type": "object",
  "patternProperties": {
    "^S_": { "type": "string" },
    "^I_": { "type": "integer" }
  }
}
```
> ⬆️ 通过正则匹配 properties

```json
{
  "type": "object",
  "properties": {
    "number": { "type": "number" },
    "street_name": { "type": "string" },
    "street_type": { "enum": ["Street", "Avenue", "Boulevard"] }
  },
  "additionalProperties": false
}
```
> ⬆️ Additional Properties
> 
> 表示是否允许实例中存在与 properties 或 patternProperties 不匹配的字段

```json
{
  "type": "object",
  "properties": {
    "number": { "type": "number" },
    "street_name": { "type": "string" },
    "street_type": { "enum": ["Street", "Avenue", "Boulevard"] }
  },
  "additionalProperties": { "type": "string" }
}
```

> ⬆️ additionalProperties 的值还可以是非 boolean 值 
> 
> 值为 `{ "type": "string" }`表示允许值是 string 类型的额外属性 


```json
{
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "email": { "type": "string" },
    "address": { "type": "string" },
    "telephone": { "type": "string" }
  },
  "required": ["name", "email"]
}
```
> ⬆️ 使用 required 指定必需字段



```json
{
  "type": "object",
  "propertyNames": {
    "pattern": "^[A-Za-z_][A-Za-z0-9_]*$"
  }
}
```
> ⬆️ 只限定属性名（property name，key）


```json
{
  "type": "object",
  "minProperties": 2,
  "maxProperties": 3
}
```
> ⬆️ 限定属性数量

---
相关链接

- https://json-schema.org/
