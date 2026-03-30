import { lazy } from 'react';

/**
 * Хук для ленивой загрузки компонентов с поддержкой named exports
 * @param importFn - Функция импорта
 * @param exportName - Имя экспорта (если не default)
 */
export function lazyImport<T extends React.ComponentType<any>>(
  importFn: () => Promise<any>,
  exportName?: string
) {
  return lazy(() =>
    importFn().then(module => ({
      default: exportName ? module[exportName] : module.default,
    }))
  );
}