/* eslint-disable no-unused-vars */
export enum TransactiontStatus {
  COMPLETED = "COMPLETED",
  PENDING = "PENDING",
}

export enum Roles {
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
}

export enum ProductStatus {
  IN_STUDY = "En estudio",
  PRE_APPROVED = "Pre-aprobado",
  COMPLETE_DOCUMENTS = "Documentos completos",
  APPROVED = "Aprobado",
  DISBURSED = "Desembolsado",
  INCOMPLETE = "Incompleto",
  INCOMPLETE_DOCUMENTS = "Documentos incompletos",
  DENIED = "Denegado",
  PAY = "Pagado",
}

export enum IdentificationType {
  CC = "Cédula de Ciudadanía",
  TI = "Tarjeta de Identidad",
  CE = "Cédula de Extranjería",
  PA = "Pasaporte",
}

export enum PermissionType {
  ADMIN = "ADMIN",
  STUDENT = "STUDENT",
  BOTH = "BOTH",
}
