# 📦 Configuración de Prisma – Guía del Proyecto

## 📦 Instalación inicial
### -npm install prisma --save-dev
### -npm install @prisma/client

## ⚙️ Inicializar Prisma
### - npx prisma init

# Esto crea:

### /prisma/schema.prisma

### .env

## 🛠 Configurar el schema.prisma

## Asegúrate de tener:

### - generator client {
        provider = "prisma-client-js"
      }

### datasource db {
###   provider = "mysql"
###   url      = env("DATABASE_URL")
### }

## 🛠 Generar Prisma Client (MUY IMPORTANTE)
### npx prisma generate

## 👉 Se ejecuta:

### Después de cambiar el schema.prisma

### Después de instalar @prisma/client

## ⚠️ Si no lo ejecutas, PrismaClient no existirá.

# 🗄 Crear migración y tablas
### - npx prisma migrate dev --name init

## 👉 Esto hace:

## Crea las tablas

### - Crea la tabla _prisma_migrations

### Genera el cliente automáticamente

## 🔍 Verificar conexión a la base de datos
### - npx prisma db pull
### 👉 Sirve para:

## Ver si conecta correctamente

### Traer tablas existentes al schema.prisma

## 🔄 Aplicar migraciones en producción
### -npx prisma migrate deploy
## 🧹 Resetear base de datos (solo desarrollo)
### - npx prisma migrate reset

## ⚠️ Borra todos los datos.

## 📊 Abrir panel visual de la base de datos
### -npx prisma studio

# Permite ver y editar datos desde una interfaz gráfica.

## 🚀 Uso recomendado en desarrollo

## Normalmente usarás:

### - npx prisma migrate dev --name nombre_cambio
### - npx prisma generate
### - npx prisma studio

## 📁 Configuración recomendada de Prisma Client (Next.js)
### import { PrismaClient } from '@prisma/client';

### const globalForPrisma = global as unknown as { prisma: PrismaClient };

###   export const prisma =
###   globalForPrisma.prisma ||
###   new PrismaClient();

###  if (process.env.NODE_ENV !== 'production') {
###  globalForPrisma.prisma = prisma;
###  }
## 👉 ¿Para qué sirve?

# Evita múltiples conexiones en desarrollo (problema común con hot reload).

## ✅ Flujo típico de trabajo

## Modificas schema.prisma

# Ejecutas:

### - npx prisma migrate dev --name cambio

## Verificas con:

### -npx prisma studio
