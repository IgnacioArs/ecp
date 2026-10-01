-- CreateTable
CREATE TABLE `roles` (
    `id_role` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_rol` VARCHAR(50) NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_role`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `apellido` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `rut` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `telefono` INTEGER NOT NULL,
    `direccion` VARCHAR(100) NOT NULL,
    `role_id` INTEGER NULL,
    `creado_por_id_usuario` INTEGER NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_actualizacion` DATETIME(3) NOT NULL,

    UNIQUE INDEX `usuarios_email_key`(`email`),
    UNIQUE INDEX `usuarios_rut_key`(`rut`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `precio_piso` (
    `id_precio_piso` INTEGER NOT NULL AUTO_INCREMENT,
    `porcentaje` DECIMAL(10, 2) NOT NULL,
    `usuario_id` INTEGER NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_actualizacion` DATETIME(3) NOT NULL,

    UNIQUE INDEX `precio_piso_porcentaje_key`(`porcentaje`),
    UNIQUE INDEX `precio_piso_usuario_id_key`(`usuario_id`),
    PRIMARY KEY (`id_precio_piso`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `poliza` (
    `id_poliza` INTEGER NOT NULL AUTO_INCREMENT,
    `sCiudad_destino` VARCHAR(100) NULL,
    `sCod_vehiculo` VARCHAR(50) NULL,
    `sId_convenio_detalle` VARCHAR(50) NULL,
    `dFecha_ini_vigencia` DATE NULL,
    `sIdentificacionProp` VARCHAR(50) NULL,
    `sNombreProp` VARCHAR(100) NULL,
    `nPrecio_empoderado` DECIMAL(10, 2) NULL,
    `sApe_paternoProp` VARCHAR(100) NULL,
    `sApe_maternoProp` VARCHAR(100) NULL,
    `nNacionalidadProp` VARCHAR(100) NULL,
    `sPais_OrigenVehiculo` VARCHAR(100) NULL,
    `sMail` VARCHAR(100) NULL,
    `sTipo_vehiculo` VARCHAR(50) NULL,
    `sPatente` VARCHAR(20) NULL,
    `sMarca` VARCHAR(100) NULL,
    `sModelo` VARCHAR(100) NULL,
    `sAnno` VARCHAR(4) NULL,
    `sMotor` VARCHAR(100) NULL,
    `telefono_celular_propietario` VARCHAR(20) NULL,
    `codigo_area_propietario` VARCHAR(20) NULL,
    `usuario_id` INTEGER NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_actualizacion` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_poliza`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ventas` (
    `id_venta` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario_id` INTEGER NULL,
    `poliza_id` INTEGER NULL,
    `precio_piso_id` INTEGER NULL,
    `precio_base` DECIMAL(10, 2) NOT NULL,
    `precio_venta` DECIMAL(10, 2) NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_actualizacion` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_venta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id_role`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `precio_piso` ADD CONSTRAINT `precio_piso_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `poliza` ADD CONSTRAINT `poliza_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id_usuario`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ventas` ADD CONSTRAINT `ventas_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id_usuario`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ventas` ADD CONSTRAINT `ventas_poliza_id_fkey` FOREIGN KEY (`poliza_id`) REFERENCES `poliza`(`id_poliza`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ventas` ADD CONSTRAINT `ventas_precio_piso_id_fkey` FOREIGN KEY (`precio_piso_id`) REFERENCES `precio_piso`(`id_precio_piso`) ON DELETE SET NULL ON UPDATE CASCADE;
