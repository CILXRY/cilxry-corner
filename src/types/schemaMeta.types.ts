// 定义元数据类型
export type FieldMeta = {
  type: "string" | "list" | "bool" | "datetime" | "number";
  required: boolean;
};
