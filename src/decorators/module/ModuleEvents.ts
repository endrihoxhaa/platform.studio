export interface ModuleEvents {
  onBoot?(): void
  onStart?(): void
  onStop?(): void
}
