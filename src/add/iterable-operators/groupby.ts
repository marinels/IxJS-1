import { IterableX } from '../../iterable';
import { groupBy, GroupedIterable } from '../../iterable/groupby';
import { identity } from '../../internal/identity';

export function groupByProto<TSource, TKey>(
  source: Iterable<TSource>,
  keySelector: (value: TSource) => TKey): IterableX<GroupedIterable<TKey, TSource>>;
export function groupByProto<TSource, TKey, TValue>(
  source: Iterable<TSource>,
  keySelector: (value: TSource) => TKey,
  elementSelector?: (value: TSource) => TValue): IterableX<GroupedIterable<TKey, TValue>>;
/**
 * @ignore
 */
export function groupByProto<TSource, TKey, TValue>(
  source: Iterable<TSource>,
  keySelector: (value: TSource) => TKey,
  elementSelector: (value: TSource) => TValue = identity): IterableX<GroupedIterable<TKey, TValue>> {
  return groupBy<TSource, TKey, TValue>(source, keySelector, elementSelector);
}

IterableX.prototype.groupBy = groupByProto;

declare module '../../iterable' {
  interface IterableX<T> {
    groupBy: typeof groupByProto;
  }
}