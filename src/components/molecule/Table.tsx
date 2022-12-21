// import React, {
//   Fragment,
//   RefObject,
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";
// import $ from "jquery";
// import { ParsedQs } from "qs";
// import { Link } from "react-router-dom";
// import {
//   Callout,
//   ContextualMenuItemType,
//   DirectionalHint,
//   IconButton,
//   IRenderFunction,
// } from "@fluentui/react";
// import {
//   CheckboxVisibility,
//   DetailsList,
//   DetailsListLayoutMode,
//   DetailsRow,
//   IColumn,
//   IDetailsColumnRenderTooltipProps,
//   IDetailsHeaderProps,
//   IGroup,
//   Selection,
//   SelectionMode,
// } from "@fluentui/react/lib/DetailsList";
// import { Stack } from "@fluentui/react/lib/Stack";
// import { DEFAULT_RPP } from "maven-lib/dist/consts/api";
// import { EdcSubjectVisitCrfsSummaryMergedSpec } from "maven-lib/dist/consts/edc";
// import {
//   arrayify,
//   classNames,
//   hasOwnProperty,
//   splitString,
// } from "maven-lib/dist/utils/misc";
// import { CrButton, CrButtonColor, CrButtonMenuItemProps } from "./CrButton";
// import { CrCalendarInput } from "./CrCalendarInput";
// import { CrCheckbox } from "./CrCheckbox";
// import { CrCheckboxes, CrCheckboxItem } from "./CrCheckboxes";
// import { CrDropdown, CrDropdownItemProps } from "./CrDropdown";
// import { CrIcon } from "./CrIcon";
// import { CrIconButton } from "./CrIconButton";
// import { CrInput } from "./CrInput";
// import { CrPagination } from "./CrPagination";
// import { CrRadioButtons } from "./CrRadioButtons";
// import { CrScrollableCheckboxes } from "./CrScrollableCheckboxes";
// import {
//   CrTableCrfStageCol,
//   CrTableStatusMessage,
// } from "./partial/CrTableCrfStageCol";
// import { Query, useRoute } from "../../hooks/useRoute";
// import { IconName, IconPackageName } from "../interface/Icon";
// import dayjs from "dayjs";
// import { cloneWith, debounce, get } from "lodash";

// export type CrTableColumnType =
//   | "none"
//   | "short"
//   | "mid"
//   | "long"
//   | "title"
//   | "title-lg" // --------
//   | "index"
//   | "username"
//   | "email"
//   | "phone"
//   | "datetime"
//   | "datetimez"
//   | "date"
//   | "icon" // --------
//   | "spacer"
//   | "menu"
//   | "crf-stage-sm"
//   | "crf-stage"
//   | "crf-stage-lg"
//   | "crf-stage-xl"
//   | "w-15"
//   | "w-25"
//   | "w-40"
//   | "w-50"
//   | "w-100"
//   | "w-150"
//   | "w-200"
//   | "w-250"
//   | "wm-50"
//   | "wm-100"
//   | "wm-150"
//   | "wm-200"
//   | "wm-250"
//   | "wf-icon"
//   | "wf-50"
//   | "wf-75"
//   | "wf-100"
//   | "wf-150"
//   | "wf-200"
//   | "wf-250"
//   | "w-25~50"
//   | "w-50~100"
//   | "w-100~150"
//   | "w-100~200"
//   | "w-120~150"
//   | "w-150~200"
//   | "w-100~300"
//   | "w-100~400"
//   | "w-150~250"
//   | "w-150~450"
//   | "w-200~300"
//   | "w-200~400"
//   | "w-200~500"
//   | "w-300~400"
//   | "w-300~500";

// export interface CrTableRowColAttributes {
//   faded?: boolean;
//   info?: boolean;
//   succ?: boolean;
//   warn?: boolean;
//   danger?: boolean;
//   severe?: boolean;
//   critical?: boolean;
//   bold?: boolean;
//   strike?: boolean;
//   italic?: boolean;
//   align?: "center" | "right";
//   className?: string | string[];
//   blink?: boolean;
//   plainLink?: boolean;
//   blockLink?: boolean;
// }

// export interface CrTableMessage extends CrTableStatusMessage {
//   search?: string;
// }

// declare type SearchableText = {
//   type: "TEXT";
//   key: string;
//   onChange?: (val: string) => void;
// };

// declare type SearchableFilterableCheck = {
//   type: "FILTERABLE_CHECK";
//   key: string;
//   items: Array<{ key: string | number; label: string }>;
//   onChange?: (val: Array<string | number>) => void;
// };

// declare type SearchableCheck = {
//   type: "CHECK";
//   key: string;
//   items: Array<{ key: string | number; label: string }>;
//   onChange?: (val: Array<string | number>) => void;
// };

// declare type SearchableRadio = {
//   type: "RADIO";
//   key: string;
//   items: Array<{ key: string | number; label: string }>;
//   onChange?: (val: Array<string | number>) => void;
// };

// declare type SearchableDateRange = {
//   type: "DATE_RANGE";
//   keyStart: string;
//   keyEnd: string;
//   format: "ISO" | "YYYYMMDD";
//   onChange?: (val: Array<string | number>) => void;
// };

// declare type SearchableNumberRange = {
//   type: "NUMBER_RANGE";
//   keyStart: string;
//   keyEnd: string;
//   onChange?: (val: Array<string | number>) => void;
// };

// // https://stackoverflow.com/a/58436959
// type Cons<H, T> = T extends readonly any[]
//   ? ((h: H, ...t: T) => void) extends (...r: infer R) => void
//     ? R
//     : never
//   : never;
// type Prev = [
//   never,
//   0,
//   1,
//   2,
//   3,
//   4,
//   5,
//   6,
//   7,
//   8,
//   9,
//   10,
//   11,
//   12,
//   13,
//   14,
//   15,
//   16,
//   17,
//   18,
//   19,
//   20,
//   ...0[]
// ];
// type Paths<T, D extends number = 5> = [D] extends [never]
//   ? never
//   : T extends object
//   ? {
//       [K in keyof T]-?:
//         | [K]
//         | (Paths<T[K], Prev[D]> extends infer P
//             ? P extends []
//               ? never
//               : Cons<K, P>
//             : never);
//     }[keyof T]
//   : [];

// export interface CrTableColumnPropsWithKey<T> {
//   key: keyof T | Paths<T> | ((item: T) => Paths<T>);
//   path?: string;
//   name: string;
//   children?: React.ReactChild;
//   type?: CrTableColumnType;
//   format?:
//     | "YYYY/MM/DD"
//     | "YYYY/MM/DD HH:mm:ss"
//     | "YYYY/MM/DD HH:mm:ss Z"
//     | "YYYY-MM-DD"
//     | "YYYY-MM-DD HH:mm:ss"
//     | "YYYY-MM-DD HH:mm:ss Z";
//   className?: string | ((item: T) => string | undefined);
//   colAttributes?:
//     | CrTableRowColAttributes
//     | ((item: T) => CrTableRowColAttributes);
//   multiline?: boolean | "ellipsis";
//   verbose?: boolean;
//   empty?: string | number | (() => string | number);
//   link?: (item: T) => string | null;
//   icon?: (item: T) => IconPackageName;
//   sub?: ((item: T) => string | number | null) | string | number;
//   badge?: ((item: T) => string | number | undefined) | string | number;
//   searchable?:
//     | SearchableText
//     | SearchableFilterableCheck
//     | SearchableCheck
//     | SearchableRadio
//     | SearchableDateRange
//     | SearchableNumberRange;
//   sortable?: boolean;
//   sortKey?: string;
// }

// type Mapper<T> = (
//   item: T,
//   index: number | undefined,
//   column: IColumn | undefined
// ) => any;
// type Renderer<T> = (
//   item: T,
//   index: number | undefined,
//   column: IColumn | undefined
// ) => React.ReactChild;
// type Menu<T> = {
//   icon: IconName;
//   tooltip?: string;
//   color?: CrButtonColor;
//   items: Array<
//     | {
//         key: string;
//         label: string;
//         icon?: IconName;
//         disabled?: boolean | ((item: T) => boolean);
//         visibility?: (item: T) => boolean;
//         onClick?: (item: T) => void;
//         renderCallout?: (
//           item: T,
//           ref: RefObject<HTMLDivElement>,
//           dismissDialog: () => void
//         ) => React.ReactNode;
//         renderAdditional?: (
//           item: T,
//           ref: RefObject<HTMLDivElement>
//         ) => React.ReactNode;
//       }
//     | { reserved: "DIVIDER" }
//   >;
// };

// export type CrTableColumnPropsWithMapper<T> = Omit<
//   CrTableColumnPropsWithKey<T>,
//   "key" | "path"
// > & {
//   map: Mapper<T>;
// };

// export type CrTableColumnPropsWithRenderer<T> = Omit<
//   CrTableColumnPropsWithKey<T>,
//   "key" | "path" | "link" | "linkBlock" | "empty"
// > & {
//   render: Renderer<T>;
// };

// export type CrTableSpacerColumnProps<T> = Omit<
//   CrTableColumnPropsWithKey<T>,
//   "key" | "path" | "link" | "linkBlock" | "empty" | "format" | "name"
// > & {
//   type: "spacer";
//   name?: string;
// };

// export type CrTableColumnPropsWithMenu<T> = Omit<
//   CrTableColumnPropsWithKey<T>,
//   "key" | "path" | "link" | "linkBlock" | "empty" | "name"
// > & {
//   type: "menu";
//   menu: Menu<T>;
//   name?: string;
// };

// export type CrTableColumnPropsWithCallout<T> = Omit<
//   CrTableColumnPropsWithKey<T>,
//   "key" | "path" | "link" | "linkBlock" | "empty" | "icon"
// > & {
//   type: "icon";
//   icon: IconName;
//   tooltip?: string;
//   renderCallout: (
//     item: T,
//     ref: RefObject<HTMLDivElement>,
//     dismissDialog: () => void
//   ) => React.ReactNode;
// };

// export type CrTableColumnProps<T = any> =
//   | CrTableSpacerColumnProps<T>
//   | CrTableColumnPropsWithKey<T>
//   | CrTableColumnPropsWithMapper<T>
//   | CrTableColumnPropsWithRenderer<T>
//   | CrTableColumnPropsWithMenu<T>
//   | CrTableColumnPropsWithCallout<T>;

// const getWidth = (type?: CrTableColumnType): [number, number | null] => {
//   if (type === "index") return [50, 100];
//   if (type === "short") return [60, null];
//   if (type === "mid") return [80, null];
//   if (type === "long") return [80, null];
//   if (type === "title") return [200, 1000];
//   if (type === "title-lg") return [200, 10 ** 10];
//   if (type === "username") return [100, null];
//   if (type === "email") return [120, null];
//   if (type === "phone") return [110, 450];
//   if (type === "datetime") return [190, 200];
//   if (type === "datetimez") return [190, 350];
//   if (type === "date") return [100, 250];
//   if (type === "spacer") return [50, null];
//   if (type === "icon") return [80, 150];
//   if (type === "menu") return [40, 40];
//   if (type === "crf-stage-sm") return [40, 100];
//   if (type === "crf-stage") return [50, 150];
//   if (type === "crf-stage-lg") return [65, 150];
//   if (type === "crf-stage-xl") return [90, 150];
//   if (type === "w-15") return [15, null];
//   if (type === "w-25") return [25, null];
//   if (type === "w-40") return [40, null];
//   if (type === "w-50") return [50, null];
//   if (type === "w-100") return [100, null];
//   if (type === "w-150") return [150, null];
//   if (type === "w-200") return [200, null];
//   if (type === "w-250") return [250, null];
//   if (type === "wm-50") return [50, null];
//   if (type === "wm-100") return [100, null];
//   if (type === "wm-150") return [150, null];
//   if (type === "wm-200") return [200, null];
//   if (type === "wm-250") return [250, null];
//   if (type === "wf-icon") return [10, 10];
//   if (type === "wf-50") return [50, 50];
//   if (type === "wf-75") return [75, 75];
//   if (type === "wf-100") return [100, 100];
//   if (type === "wf-150") return [150, 150];
//   if (type === "wf-200") return [200, 200];
//   if (type === "wf-250") return [250, 250];
//   if (type === "w-25~50") return [25, 50];
//   if (type === "w-50~100") return [50, 100];
//   if (type === "w-100~150") return [100, 150];
//   if (type === "w-100~200") return [100, 200];
//   if (type === "w-120~150") return [120, 150];
//   if (type === "w-150~200") return [150, 200];
//   if (type === "w-100~300") return [100, 300];
//   if (type === "w-100~400") return [100, 400];
//   if (type === "w-150~250") return [150, 250];
//   if (type === "w-150~450") return [150, 450];
//   if (type === "w-200~300") return [200, 300];
//   if (type === "w-200~400") return [200, 400];
//   if (type === "w-200~500") return [200, 500];
//   if (type === "w-300~400") return [300, 400];
//   if (type === "w-300~500") return [300, 500];
//   return [50, null];
// };

// export function useSearchStack(
//   keys: {
//     [key: string]: (val: Array<string | number> | undefined) => {
//       keyLabel: string;
//       valLabel: string | number | Array<string | number> | undefined;
//       rangeWith?: string;
//       rangeBy?: string;
//     };
//   },
//   cacheKey?: string
// ): {
//   removeQuery: (key: string) => void;
//   pushQuery: (params: Query) => void;
//   searchStacks: Array<CrTableSearchStack>;
// } {
//   const { removeQuery, pushQuery, query } = useRoute();
//   const searchStacks: CrTableSearchStack[] = Object.keys(keys).map((x) => {
//     const cacheQuery = (() => {
//       try {
//         return cacheKey && !!localStorage.getItem(cacheKey)
//           ? JSON.parse(localStorage.getItem(cacheKey))
//           : null;
//       } catch {
//         return null;
//       }
//     })();
//     const val =
//       cacheQuery && cacheQuery[x]
//         ? String(cacheQuery[x] || "").split(",")
//         : query[x]
//         ? String(query[x] || "").split(",")
//         : undefined;
//     const spec = keys[x](val);

//     return {
//       key: x,
//       keyLabel: spec.keyLabel,
//       val,
//       valLabel: spec.valLabel,
//       rangeWith: spec.rangeWith,
//       rangeBy: spec.rangeBy,
//     };
//   });

//   return {
//     removeQuery,
//     pushQuery,
//     searchStacks,
//   };
// }

// export interface CrTableSearchStack {
//   key: string;
//   rangeWith?: string;
//   rangeBy?: string;
//   keyLabel?: string;
//   val: string | number | Array<string | number> | undefined;
//   valLabel?: string | number | Array<string | number>;
//   silent?: boolean;
// }

// export type CrTableSearchFieldProps = CrDropdownItemProps & {
//   enums?: {
//     key: string | number;
//     text: string;
//   }[];
// };

// export type CrTableSelectionMode = "none" | "single" | "multiple";

// export type CrTableSelectedRows = {
//   textTemplate: boolean | ((selectedRowCount: number) => string);
//   contextMenu?:
//     | CrButtonMenuItemProps[]
//     | ((selectedRowCount: number) => CrButtonMenuItemProps[]);
// };

// export interface CrTableProps<T> {
//   className?: string;
//   rowAttributes?: (item: T) => CrTableRowColAttributes;
//   indexColumn?: boolean;
//   headerVisible: boolean;
//   empty?: React.ReactNode;
//   columns: CrTableColumnProps<T>[];
//   groups?: Array<IGroup>;
//   items: T[] | null;
//   enableShimmer?: boolean;
//   searchEnabled?: boolean;
//   selectionMode?: CrTableSelectionMode;
//   dataSelectionToggle?: boolean;
//   hidePaginationWhenNotApplicable?: boolean;
//   detailsListOnShouldVirtualizable?: boolean;
//   rowLink?: (item: T) => string | null;

//   rppChangeEnable?: boolean;
//   rppFields?: Array<CrTableSearchFieldProps>;
//   onRppChange?: (rpp: string) => void;

//   option?: {
//     label: string;
//     defaultChecked: boolean;
//     onValueChanged: (val: boolean, isInitial?: boolean) => void;
//   };

//   autoSearchEnable?: boolean;
//   searchFields?: Array<CrTableSearchFieldProps>;
//   searchField?: string;
//   searchStacks?: Array<CrTableSearchStack>;
//   onRemoveSearchStack?: (item: CrTableSearchStack) => void;
//   searchKeyword?: string;
//   onSearchKeywordEnter?: (keyword: { [key: string]: string }) => void;

//   onSelectionChange?: (items: Array<T>) => void;
//   onPageClick?: (page: number) => void;

//   paginationEnabled: boolean;
//   currentPage?: number;
//   totalItems?: number | bigint;
//   itemsPerPage?: number;
//   query?: Query | ParsedQs;
//   pushQuery?: (qs: Query) => void;
//   removeQuery?: (key: string) => void;
//   canSelectRow?: (item: T) => boolean;

//   defaultSelectedAll?: boolean;

//   childrenFooter?: React.ReactNode;
//   selection?: Selection<any>;

//   stickyScrollbar?: boolean;

//   message?: CrTableMessage;

//   selectedRows?: CrTableSelectedRows;
// }

// type ColumnsTransformerOptions = {
//   crfStageColElId: string;
// };

// interface StickyScrollbarProps {
//   refTable: React.MutableRefObject<any>;
//   crfStageColElId: string;
// }

// export function DateRangeSearch(props: {
//   from: string | undefined;
//   to: string | undefined;
//   toMaxDate?: Date;
//   hideButton?: boolean;
//   onFromValueChange?: (value: string) => void;
//   onToValueChange?: (value: string) => void;
//   onClick?: () => void;
//   disabled?: boolean;
//   valueVisible?: boolean;
//   searchBtnLabel?: string;
// }) {
//   const {
//     hideButton,
//     onClick,
//     onFromValueChange,
//     onToValueChange,
//     disabled,
//     valueVisible,
//     searchBtnLabel,
//   } = props;
//   const from = props.from ? dayjs(props.from) : undefined;
//   const to = props.to ? dayjs(props.to) : undefined;
//   const fromMinDate = dayjs().add(-100, "years").toDate();
//   const [fromMaxDate, setFromMaxDate] = useState(
//     to ? to.toDate() : dayjs().add(100, "years").toDate()
//   );
//   const [toMinDate, setToMinDate] = useState(
//     from ? from.toDate() : dayjs().add(-100, "years").toDate()
//   );
//   const toMaxDate = props.toMaxDate || dayjs().add(100, "year").toDate();

//   return (
//     <>
//       <div className="--type-range">
//         <CrCalendarInput
//           minDate={fromMinDate}
//           maxDate={fromMaxDate}
//           defaultValue={from ? from.toDate() : undefined}
//           format="YYYY/MM/DD"
//           onValueChange={(v) => {
//             onFromValueChange && onFromValueChange(v);
//             setToMinDate(
//               v ? dayjs(v).toDate() : dayjs().add(-100, "years").toDate()
//             );
//           }}
//           onDeleteDate={() => {
//             onFromValueChange && onFromValueChange("");
//             setToMinDate(dayjs().add(-100, "years").toDate());
//           }}
//           disabled={disabled}
//           valueVisible={valueVisible}
//         />
//         <span className="--delimiter">~</span>
//         <CrCalendarInput
//           minDate={toMinDate}
//           maxDate={toMaxDate}
//           defaultValue={to ? to.toDate() : undefined}
//           format="YYYY/MM/DD"
//           onValueChange={(v) => {
//             onToValueChange && onToValueChange(v);
//             setFromMaxDate(v ? dayjs(v).toDate() : toMaxDate);
//           }}
//           onDeleteDate={() => {
//             onToValueChange && onToValueChange("");
//             setFromMaxDate(toMaxDate);
//           }}
//           disabled={disabled}
//           valueVisible={valueVisible}
//         />
//         {hideButton !== true && (
//           <CrButton
//             onClick={onClick}
//             text={searchBtnLabel || "검색"}
//             color="primary"
//           />
//         )}
//       </div>
//     </>
//   );
// }

// function NumberRangeSearch(props: {
//   from: string | undefined;
//   to: string | undefined;
//   onFromValueChange?: (value: string) => void;
//   onToValueChange?: (value: string) => void;
//   onClick?: (value?: string, valueRange?: string) => void;
//   searchBtnLabel?: string;
// }) {
//   const { onClick, onFromValueChange, onToValueChange, searchBtnLabel } = props;
//   const [from, setFrom] = useState(props.from || undefined);
//   const [to, setTo] = useState(props.to || undefined);
//   const swapIfNeeded = () => {
//     let small = from;
//     let large = to;
//     if (
//       from &&
//       to &&
//       /^\d+$/.test(from) &&
//       /^\d+$/.test(to) &&
//       Number(from) > Number(to)
//     ) {
//       small = to;
//       large = from;
//       setFrom(small);
//       setTo(large);
//       onFromValueChange && onFromValueChange(small);
//       onToValueChange && onToValueChange(large);
//     }

//     return [small, large];
//   };

//   return (
//     <div className="--type-range">
//       <CrInput
//         autoFocus={true}
//         autoComplete="off"
//         value={from}
//         maxLength={9}
//         onValueChange={(v) => {
//           setFrom(v.replace(/[^\d]/g, ""));
//           onFromValueChange && onFromValueChange(v.replace(/[^\d]/g, ""));
//         }}
//         onEnterKeyDown={() => {
//           const [small, large] = swapIfNeeded();
//           onClick && onClick(small, large);
//         }}
//         onBlur={(_) => {
//           swapIfNeeded();
//         }}
//       />
//       <span className="--delimiter">~</span>
//       <CrInput
//         autoComplete="off"
//         maxLength={9}
//         value={to}
//         onValueChange={(v) => {
//           setTo(v.replace(/[^\d]/g, ""));
//           onToValueChange && onToValueChange(v.replace(/[^\d]/g, ""));
//         }}
//         onEnterKeyDown={() => {
//           const [small, large] = swapIfNeeded();
//           onClick && onClick(small, large);
//         }}
//         onBlur={(_) => {
//           swapIfNeeded();
//         }}
//       />
//       <CrButton
//         onClick={() => onClick && onClick(from, to)}
//         text={searchBtnLabel || "검색"}
//         color="primary"
//       />
//     </div>
//   );
// }

// const ALL_SELECT_KEY = "ALL";
// const ALL_SELECT_ITEM_LENGTH = 1;

// function FilterableCheck(props: {
//   column: CrTableColumnProps;
//   searchStack: CrTableSearchStack;
//   searchBtnLabel?: string;
//   onClick: (
//     v?: string | number | (string | number)[],
//     vr?: string | number | (string | number)[]
//   ) => void;
// }) {
//   const { column, searchStack, onClick, searchBtnLabel } = props;

//   const [valueForFilter, setValueForFilter] = useState<string>("");
//   const checkedValues = useRef<Array<string | number>>(
//     arrayify(searchStack.val)
//   );
//   const isAllCheckItemChecked = useRef(false);

//   const getFilteredItems = useCallback(
//     (
//       keyword: { raw?: string; justUseCurrentState?: boolean },
//       checkedValues: Array<string | number>
//     ) => {
//       const filteredItems =
//         (column.searchable as SearchableFilterableCheck).items
//           .filter((item) =>
//             item.label.includes(
//               keyword.justUseCurrentState ? valueForFilter : keyword.raw || ""
//             )
//           )
//           .map((e) => ({
//             key: String(e.key),
//             label: e.label,
//             defaultChecked: !!checkedValues.find((x) => x === String(e.key)),
//           })) || [];

//       if (filteredItems.length) {
//         isAllCheckItemChecked.current = !filteredItems.find(
//           (filteredItem) => !filteredItem.defaultChecked
//         );

//         const allCheckItem: CrCheckboxItem = {
//           key: ALL_SELECT_KEY,
//           label: "Select All",
//           defaultChecked: isAllCheckItemChecked.current,
//         };

//         return [allCheckItem].concat(filteredItems);
//       }

//       return [];
//     },
//     [column.searchable, valueForFilter]
//   );

//   const [filteredItems, setFilteredItems] = useState<Array<CrCheckboxItem>>(
//     getFilteredItems({ raw: "" }, checkedValues.current)
//   );

//   const isFilteringBusy = useRef(false);
//   const memorizedValueForFilter = useRef("");

//   useEffect(() => {
//     memorizedValueForFilter.current = valueForFilter;

//     const isAlreadyUpdatedByEraseButton =
//       !valueForFilter &&
//       (column.searchable as SearchableFilterableCheck).items.length ===
//         filteredItems.length - ALL_SELECT_ITEM_LENGTH;

//     if (!isAlreadyUpdatedByEraseButton && !isFilteringBusy.current) {
//       isFilteringBusy.current = true;

//       setTimeout(() => {
//         setFilteredItems(
//           getFilteredItems(
//             { raw: memorizedValueForFilter.current },
//             checkedValues.current
//           )
//         );

//         isFilteringBusy.current = false;
//       }, 200);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [valueForFilter]);

//   return (
//     <>
//       <div className="--type-filterable-check">
//         <div className="--type-text">
//           <div className="--type-text-input-wrapper">
//             <CrInput
//               value={valueForFilter}
//               onChange={(_, val) => setValueForFilter(val)}
//             />
//             <CrIconButton
//               icon="EraseTool"
//               onClick={() => {
//                 if (valueForFilter) {
//                   setFilteredItems(
//                     getFilteredItems({ raw: "" }, checkedValues.current)
//                   );
//                   setValueForFilter("");
//                 }
//               }}
//             />
//           </div>
//           <CrButton
//             onClick={() => {
//               onClick(checkedValues.current);
//             }}
//             text={searchBtnLabel || "검색"}
//             color="primary"
//           />
//         </div>
//         <CrScrollableCheckboxes
//           items={filteredItems}
//           onValueChange={(key, checked) => {
//             const checkedKeyExcludedValues = checkedValues.current.filter(
//               (x) => x && x !== key
//             );

//             if (key === ALL_SELECT_KEY) {
//               if (checked) {
//                 const uncheckedFilteredItemKeys = filteredItems
//                   .filter(
//                     (filteredItem) =>
//                       filteredItem.key !== ALL_SELECT_KEY &&
//                       !checkedValues.current.includes(filteredItem.key)
//                   )
//                   .map((filteredItem) => filteredItem.key);

//                 checkedValues.current = checkedKeyExcludedValues.concat(
//                   uncheckedFilteredItemKeys
//                 );
//               } else {
//                 const filteredItemKeys = filteredItems.map(
//                   (filteredItem) => filteredItem.key
//                 );

//                 checkedValues.current = checkedKeyExcludedValues.filter(
//                   (valKey) => !filteredItemKeys.includes(String(valKey))
//                 );
//               }

//               setFilteredItems(
//                 getFilteredItems(
//                   { justUseCurrentState: true },
//                   checkedValues.current
//                 )
//               );
//             } else {
//               checkedValues.current = checked
//                 ? checkedKeyExcludedValues.concat(key)
//                 : checkedKeyExcludedValues;

//               const isAllChecked =
//                 filteredItems.filter((filteredItem) =>
//                   checkedValues.current.includes(filteredItem.key)
//                 ).length ===
//                 filteredItems.length - ALL_SELECT_ITEM_LENGTH;

//               if (
//                 (!isAllCheckItemChecked.current && isAllChecked) ||
//                 (isAllCheckItemChecked.current && !isAllChecked)
//               ) {
//                 setFilteredItems(
//                   getFilteredItems(
//                     { justUseCurrentState: true },
//                     checkedValues.current
//                   )
//                 );
//               }
//             }
//           }}
//         />
//       </div>
//     </>
//   );
// }

// function Header(props: {
//   name: string;
//   column: CrTableColumnProps;
//   searchStack?: CrTableSearchStack;
//   searchStackRange?: CrTableSearchStack;
//   onRemoveSearchStack?: (item: CrTableSearchStack) => void;
//   query?: Query | ParsedQs;
//   pushQuery?: (params: Query) => void;
//   removeQuery?: (key: string) => void;
//   message: CrTableMessage;
// }) {
//   const {
//     name,
//     column,
//     searchStack,
//     searchStackRange,
//     onRemoveSearchStack,
//     query,
//     pushQuery,
//     removeQuery,
//     message,
//   } = props;
//   const ref = useRef(null);
//   const [shown, setShown] = useState(false);
//   const [value, setValue] = useState<string | number | Array<string | number>>(
//     searchStack?.val || ""
//   );
//   const [valueChanged, setValueChanged] = useState(false);
//   const [valueRange, setValueRange] = useState<
//     string | number | Array<string | number>
//   >(searchStackRange?.val || "");
//   const [valueRangeChanged, setValueRangeChanged] = useState(false);

//   const SORT_QUERY_KEY = "sort";
//   const SORT_DELIMITER = "_";
//   const SORT_ASC = "ASC";
//   const SORT_DESC = "DESC";

//   const onClick = (
//     v?: string | number | (string | number)[],
//     vr?: string | number | (string | number)[]
//   ) => {
//     v = (v !== undefined ? v : valueChanged ? value : searchStack?.val) || "";
//     vr =
//       (vr !== undefined
//         ? vr
//         : valueRangeChanged
//         ? valueRange
//         : searchStackRange?.val) || "";

//     if (!v && !vr && onRemoveSearchStack) {
//       if (column.searchable && hasOwnProperty(column.searchable, "key")) {
//         onRemoveSearchStack({ key: column.searchable?.key as string, val: "" });
//       }
//       if (column.searchable && hasOwnProperty(column.searchable, "keyStart")) {
//         onRemoveSearchStack({
//           key: column.searchable?.keyStart as string,
//           val: "",
//         });
//       }
//       if (column.searchable && hasOwnProperty(column.searchable, "keyEnd")) {
//         onRemoveSearchStack({
//           key: column.searchable?.keyEnd as string,
//           val: "",
//         });
//       }
//     } else if (v || (searchStackRange && vr)) {
//       if (pushQuery && searchStack) {
//         if (searchStackRange) {
//           pushQuery({
//             [searchStack.key]: arrayify(v).join(",") || "",
//             [searchStackRange.key]: arrayify(vr).join(",") || "",
//             page: 1,
//           });
//         } else {
//           pushQuery({ [searchStack.key]: arrayify(v).join(","), page: 1 });
//         }
//       } else if (column.searchable?.onChange) {
//         column.searchable?.onChange(v as any);
//       }
//     }

//     setShown(false);
//   };

//   return (
//     <>
//       <div
//         className={classNames(
//           "cr-table-header-column",
//           shown && "--filtering",
//           (!!searchStack?.val || !!searchStackRange?.val) && "--filtered",
//           column.sortable && "--sortable"
//         )}
//         onClick={() => {
//           if (!column.sortable) return;

//           const key = hasOwnProperty(column, "sortKey")
//             ? column.sortKey
//             : hasOwnProperty(column, "key")
//             ? String(column.key)
//             : null;

//           if (!key) return;

//           if (
//             !query[SORT_QUERY_KEY] ||
//             (query[SORT_QUERY_KEY] as string).split(SORT_DELIMITER)[0] !== key
//           ) {
//             pushQuery({
//               [SORT_QUERY_KEY]: `${key}${SORT_DELIMITER}${SORT_ASC}`,
//               page: 1,
//             });
//           } else if (
//             query[SORT_QUERY_KEY] === `${key}${SORT_DELIMITER}${SORT_ASC}`
//           ) {
//             pushQuery({
//               [SORT_QUERY_KEY]: `${key}${SORT_DELIMITER}${SORT_DESC}`,
//               page: 1,
//             });
//           } else {
//             removeQuery(SORT_QUERY_KEY);
//           }
//         }}
//       >
//         <div
//           className={classNames(
//             "cr-table-header-column-title",
//             column.colAttributes &&
//               hasOwnProperty(column.colAttributes, "align") &&
//               `--${column?.colAttributes?.align}`
//           )}
//         >
//           <span className="cr-table-header-column-label">{name}</span>
//           {column?.children && column.children}
//           {column?.searchable && (
//             <>
//               <div ref={ref}>
//                 <IconButton
//                   className="cr-table-header-column-filter"
//                   iconProps={{ iconName: "FilterSettings" }}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setShown(!shown);
//                   }}
//                 />
//                 {shown && (
//                   <Callout
//                     isBeakVisible={true}
//                     className="cr-table-header-search-callout"
//                     gapSpace={0}
//                     doNotLayer={false}
//                     target={ref.current}
//                     directionalHint={DirectionalHint.topCenter}
//                     onDismiss={() => {
//                       setValue("");
//                       setShown(false);
//                     }}
//                     setInitialFocus={!searchStackRange}
//                   >
//                     {column.searchable.type === "TEXT" && (
//                       <div className="--type-text">
//                         <CrInput
//                           defaultValue={arrayify(searchStack?.val || "").join(
//                             " "
//                           )}
//                           onEnterKeyDown={(_, val) => {
//                             setValue(val || "");
//                             if (val) setValueChanged(true);

//                             onClick();
//                           }}
//                           onChange={(_, val) => {
//                             setValue(val || "");
//                             setValueChanged(true);
//                           }}
//                         />
//                         <CrButton
//                           onClick={() => onClick()}
//                           text={message?.search || "검색"}
//                           color="primary"
//                         />
//                       </div>
//                     )}
//                     {column.searchable.type === "FILTERABLE_CHECK" && (
//                       <FilterableCheck
//                         column={column}
//                         searchStack={searchStack}
//                         onClick={onClick}
//                         searchBtnLabel={message?.search}
//                       />
//                     )}
//                     {column.searchable.type === "CHECK" && (
//                       <div className="--type-check">
//                         <CrCheckboxes
//                           items={
//                             column.searchable.items.map((e) => ({
//                               key: String(e.key),
//                               label: e.label,
//                               defaultChecked: !!arrayify(searchStack?.val).find(
//                                 (x) => x === e.key
//                               ),
//                             })) || []
//                           }
//                           onValueChange={(key, checked) => {
//                             setValueChanged(true);

//                             if (checked) {
//                               setValue(
//                                 arrayify(value)
//                                   .filter((x) => x && x !== key)
//                                   .concat(key)
//                               );
//                             } else {
//                               setValue(
//                                 arrayify(value).filter((x) => x && x !== key)
//                               );
//                             }
//                           }}
//                         />
//                         <CrButton
//                           onClick={() => onClick()}
//                           text={message?.search || "검색"}
//                           color="primary"
//                         />
//                       </div>
//                     )}
//                     {column.searchable.type === "RADIO" && (
//                       <div className="--type-radio">
//                         <CrRadioButtons
//                           items={column.searchable.items.map((e) => ({
//                             key: String(e.key),
//                             label: e.label,
//                           }))}
//                           defaultSelectedKey={String(
//                             arrayify(searchStack?.val)[0]
//                           )}
//                           onValueChange={(val) => {
//                             setValue(val || "");
//                             setValueChanged(true);
//                           }}
//                         />
//                         <CrButton
//                           onClick={() => onClick()}
//                           text={message?.search || "검색"}
//                           color="primary"
//                         />
//                       </div>
//                     )}
//                     {column.searchable.type === "DATE_RANGE" && (
//                       <DateRangeSearch
//                         from={value ? String(value) : undefined}
//                         to={valueRange ? String(valueRange) : undefined}
//                         searchBtnLabel={message?.search}
//                         onFromValueChange={(from: string) => {
//                           setValueChanged(true);
//                           if (hasOwnProperty(column.searchable!, "format")) {
//                             if (column.searchable.format === "YYYYMMDD") {
//                               setValue(from.replaceAll("/", ""));
//                             } else if (column.searchable.format === "ISO") {
//                               const [yyyy, mm, dd] = from.split("/");
//                               let parsedDate = "";
//                               try {
//                                 parsedDate = new Date(
//                                   Number(yyyy),
//                                   Number(mm) - 1,
//                                   Number(dd),
//                                   0,
//                                   0,
//                                   0
//                                 ).toISOString();
//                               } catch (e) {
//                                 parsedDate = "";
//                               }
//                               setValue(parsedDate);
//                             }
//                           }
//                         }}
//                         onToValueChange={(to: string) => {
//                           setValueRangeChanged(true);
//                           if (hasOwnProperty(column.searchable!, "format")) {
//                             if (column.searchable.format === "YYYYMMDD") {
//                               setValueRange(to.replaceAll("/", ""));
//                             } else if (column.searchable.format === "ISO") {
//                               const [yyyy, mm, dd] = to.split("/");
//                               let parsedDate = "";
//                               try {
//                                 parsedDate = new Date(
//                                   Number(yyyy),
//                                   Number(mm) - 1,
//                                   Number(dd),
//                                   23,
//                                   59,
//                                   59
//                                 ).toISOString();
//                               } catch (e) {
//                                 parsedDate = "";
//                               }
//                               setValueRange(parsedDate);
//                             }
//                           }
//                         }}
//                         onClick={() => {
//                           onClick && onClick();
//                         }}
//                       />
//                     )}
//                     {column.searchable.type === "NUMBER_RANGE" && (
//                       <NumberRangeSearch
//                         from={value ? String(value) : undefined}
//                         to={valueRange ? String(valueRange) : undefined}
//                         searchBtnLabel={message?.search}
//                         onFromValueChange={(from: string) => {
//                           setValueChanged(true);
//                           setValue(from);
//                         }}
//                         onToValueChange={(to: string) => {
//                           setValueRangeChanged(true);
//                           setValueRange(to);
//                         }}
//                         onClick={(value?: string, valueRange?: string) => {
//                           onClick && onClick(value, valueRange);
//                         }}
//                       />
//                     )}
//                   </Callout>
//                 )}
//               </div>
//             </>
//           )}
//           {column.sortable &&
//             (() => {
//               const key = hasOwnProperty(column, "sortKey")
//                 ? column.sortKey
//                 : hasOwnProperty(column, "key")
//                 ? String(column.key)
//                 : null;

//               if (!key) return undefined;

//               return (
//                 <div className="sort-icon">
//                   {query[SORT_QUERY_KEY] !==
//                     `${key}${SORT_DELIMITER}${SORT_DESC}` && (
//                     <IconButton
//                       className={classNames(
//                         "cr-table-header-column-sort-up",
//                         query[SORT_QUERY_KEY] ===
//                           `${key}${SORT_DELIMITER}${SORT_ASC}` && "--sorting"
//                       )}
//                       iconProps={{ iconName: "Up" }}
//                     />
//                   )}
//                   {query[SORT_QUERY_KEY] ===
//                     `${key}${SORT_DELIMITER}${SORT_DESC}` && (
//                     <IconButton
//                       className="cr-table-header-column-sort-down"
//                       iconProps={{ iconName: "Down" }}
//                     />
//                   )}
//                 </div>
//               );
//             })()}
//         </div>
//       </div>
//     </>
//   );
// }

// function MenuButton<T>(props: {
//   column: CrTableColumnPropsWithMenu<T>;
//   item: any;
// }) {
//   const elementRef = useRef<HTMLDivElement>(null);
//   const { column, item } = props;
//   const [showCallout, setShowCallout] = useState<boolean[]>(
//     Array(column.menu!.items.length).fill(false)
//   );
//   const dismissDialog = () => {
//     setShowCallout([...showCallout.fill(false)]);
//   };

//   return (
//     <>
//       <CrIconButton
//         elementRef={elementRef}
//         icon={column.menu!.icon}
//         tooltip={column.menu!.tooltip}
//         color={column.menu!.color}
//         menuItems={
//           column
//             .menu!.items.map((e, i) => {
//               if (hasOwnProperty(e, "reserved")) {
//                 if (e.reserved === "DIVIDER") {
//                   return {
//                     key: `div_${i}`,
//                     itemType: ContextualMenuItemType.Divider,
//                   };
//                 } else {
//                   return {
//                     key: `invalid_${i}`,
//                     text: "Invalid Config",
//                   };
//                 }
//               } else {
//                 if (e.visibility && !e.visibility(item)) return undefined;
//                 return {
//                   key: e.key,
//                   text: e.label,
//                   icon: e.icon || "ChevronRight",
//                   disabled:
//                     typeof e.disabled === "function"
//                       ? e.disabled(item)
//                       : e.disabled,
//                   iconClassName: "tiny",
//                   onClick: () => {
//                     e.onClick && e.onClick(item);
//                     if (e.renderCallout) {
//                       showCallout[i] = !showCallout[i];
//                       setShowCallout([...showCallout]);
//                     }
//                   },
//                 };
//               }
//             })
//             .filter((e) => !!e) as CrButtonMenuItemProps[]
//         }
//       />
//       {column.menu!.items.map(
//         (e, i) =>
//           hasOwnProperty(e, "label") &&
//           e.renderCallout &&
//           showCallout[i] && (
//             <div key={i}>
//               {e.renderCallout(item, elementRef, dismissDialog)}
//             </div>
//           )
//       )}
//       {column.menu!.items.map(
//         (e, i) =>
//           hasOwnProperty(e, "label") &&
//           e.renderAdditional && (
//             <Fragment key={i}>{e.renderAdditional(item, elementRef)}</Fragment>
//           )
//       )}
//     </>
//   );
// }

// function renderSub<T>(
//   data: ((item: T) => string | null | number) | string | number,
//   item: T
// ) {
//   const rendered = typeof data === "function" ? data(item) : data;

//   return <>{!!rendered && <div className="--sub">{rendered}</div>}</>;
// }

// function renderBadge<T>(
//   data: ((item: T) => string | null | number) | string | number,
//   item: T
// ) {
//   const rendered = typeof data === "function" ? data(item) : data;

//   return <>{!!rendered && <div className="--badge">{rendered}</div>}</>;
// }

// const columnsTransformer = (
//   columns: CrTableColumnProps[],
//   opts: ColumnsTransformerOptions,
//   shimming: boolean,
//   message?: CrTableStatusMessage
// ): IColumn[] =>
//   columns.map((column, i) =>
//     columnTransformer(column, i, opts, shimming, message)
//   );
// const columnTransformer = (
//   column: CrTableColumnProps,
//   index = 0,
//   opts: ColumnsTransformerOptions,
//   shimming: boolean,
//   message?: CrTableStatusMessage
// ): IColumn => ({
//   key: String(index),
//   fieldName: hasOwnProperty(column, "key")
//     ? // @ts-ignore
//       hasOwnProperty(column, "path") && column.path
//       ? `${column.key as string}.${column.path}`
//       : (column.key as string)
//     : undefined,
//   name: column.name,
//   onRender: (
//     (map: Mapper<any> | undefined, type, format) =>
//     (item: any, index: number | undefined, c: IColumn | undefined) => {
//       let emptyFlag = false;

//       if (shimming) {
//         return <div className="--shimmer"></div>;
//       }

//       const data = (() => {
//         if (map) {
//           return map(item, index, c);
//         }

//         const resolvedValue = get(
//           item,
//           ((v) => (Array.isArray(v) ? v.join(".") : v))(
//             typeof c?.fieldName === "function"
//               ? (c?.fieldName as any)(item)
//               : c?.fieldName
//           ) || "undefined"
//         );
//         const value = resolvedValue;

//         if (
//           type === "crf-stage-sm" ||
//           type === "crf-stage" ||
//           type === "crf-stage-lg" ||
//           type === "crf-stage-xl"
//         ) {
//           const visit: EdcSubjectVisitCrfsSummaryMergedSpec = value;

//           return (
//             <>
//               {visit && (
//                 <CrTableCrfStageCol
//                   crfStageColElId={opts.crfStageColElId}
//                   visit={visit}
//                   message={message}
//                 />
//               )}
//             </>
//           );
//         } else if (
//           type === "icon" &&
//           hasOwnProperty(column, "icon") &&
//           hasOwnProperty(column, "renderCallout")
//         ) {
//           const elementRef = useRef<HTMLDivElement>(null);
//           const [showCallout, setShowCallout] = useState<boolean>(false);
//           const dismissDialog = () => {
//             setShowCallout(false);
//           };

//           return (
//             <>
//               <CrIconButton
//                 elementRef={elementRef}
//                 icon={column.icon}
//                 tooltip={column.tooltip}
//                 onClick={() => setShowCallout(true)}
//               />
//               {showCallout && (
//                 <div>
//                   {column.renderCallout(item, elementRef, dismissDialog)}
//                 </div>
//               )}
//             </>
//           );
//         }

//         if (hasOwnProperty(column, "render") && column.render) {
//           return column.render(item, index, c);
//         }

//         if (hasOwnProperty(column, "empty") && column.empty !== undefined) {
//           const empty =
//             typeof column.empty === "function" ? column.empty() : column.empty;
//           if (!value) {
//             emptyFlag = true;
//             return empty;
//           }
//         }

//         if (type === "date") {
//           if (!value) return "-";
//           else if (typeof value === "string" && value.length === 8) {
//             return splitString(value, "/", 4, 2, 2);
//           } else return dayjs(value).format("YYYY/MM/DD");
//         } else if (type === "datetimez") {
//           if (!value) return "-";
//           else if (format === "YYYY/MM/DD")
//             return dayjs(value).format("YYYY/MM/DD");
//           else if (format === "YYYY/MM/DD HH:mm:ss")
//             return dayjs(value).format("YYYY/MM/DD HH:mm:ss");
//           else return dayjs(value).format("YYYY/MM/DD HH:mm:ss Z");
//         } else if (type === "datetime") {
//           if (!value) return "-";
//           else if (format === "YYYY/MM/DD HH:mm:ss Z")
//             return dayjs(value).format("YYYY/MM/DD HH:mm:ss Z");
//           else if (format === "YYYY/MM/DD")
//             return dayjs(value).format("YYYY/MM/DD");
//           else return dayjs(value).format("YYYY/MM/DD HH:mm:ss");
//         } else if (type === "menu" && hasOwnProperty(column, "menu")) {
//           return <MenuButton column={column} item={item} />;
//         }

//         return value;
//       })();

//       const attributes = column.colAttributes
//         ? typeof column.colAttributes === "function"
//           ? column.colAttributes(item)
//           : column.colAttributes
//         : undefined;

//       if (hasOwnProperty(column, "link") && column.link) {
//         const to =
//           typeof column.link === "function" ? column.link(item) : column.link;

//         if (to) {
//           return (
//             <>
//               <Link
//                 to={to}
//                 className={classNames(
//                   attributes?.blockLink && "--block-link",
//                   attributes?.plainLink && "--plain-link"
//                 )}
//               >
//                 {typeof column.icon === "function" && (
//                   <CrIcon className="cr-col--icon" icon={column.icon(item)} />
//                 )}
//                 <span>{data || "-"}</span>
//               </Link>
//               {hasOwnProperty(column, "sub")
//                 ? renderSub(column.sub, item)
//                 : undefined}
//               {hasOwnProperty(column, "badge")
//                 ? renderBadge(column.badge, item)
//                 : undefined}
//             </>
//           );
//         }
//       }
//       const className = ((prop) => {
//         if (typeof prop === "string") return prop;
//         else if (typeof prop === "function") return prop(item);

//         return undefined;
//       })(column.className);

//       const isWrappable = !!attributes?.severe || !!attributes?.critical;

//       return (
//         <div
//           className={classNames(
//             "cr-col",
//             className,
//             `type--${column.type || "none"}`,
//             attributes?.className,
//             attributes?.faded && "--faded",
//             attributes?.danger && "--danger",
//             attributes?.severe && "--severe",
//             attributes?.critical && "--critical",
//             attributes?.warn && "--warn",
//             attributes?.succ && "--succ",
//             attributes?.info && "--info",
//             attributes?.bold && "--bold",
//             attributes?.strike && "--strike",
//             attributes?.blink && "--blink",
//             attributes?.italic && "--italic",
//             attributes?.align && `--${attributes?.align}`,
//             attributes?.blockLink && "--block-link",
//             attributes?.plainLink && "--plain-link",
//             emptyFlag && "--empty",
//             column.multiline === "ellipsis" && "--ellipsis",
//             column.verbose && "--verbose"
//           )}
//         >
//           {typeof column.icon === "function" && (
//             <CrIcon className="cr-col--icon" icon={column.icon(item)} />
//           )}
//           {isWrappable && <div className="--wrapped">{data}</div>}
//           {!isWrappable && <>{data}</>}
//           {hasOwnProperty(column, "sub")
//             ? renderSub(column.sub, item)
//             : undefined}
//           {hasOwnProperty(column, "badge")
//             ? renderBadge(column.badge, item)
//             : undefined}
//         </div>
//       );
//     }
//   )(
//     hasOwnProperty(column, "map") ? (column.map as Mapper<any>) : undefined,
//     column.type,
//     hasOwnProperty(column, "format") ? column.format : undefined
//   ),
//   minWidth: getWidth(column.type)[0],
//   maxWidth: ((w) => {
//     if (w[1]) return w[1];
//     return w[0] * 3;
//   })(getWidth(column.type)),
//   isResizable: ((type) => {
//     if (type === "icon") return false;
//     return true;
//   })(column.type),
//   isMultiline:
//     typeof column.multiline === "boolean" ? column.multiline : undefined,
// });

// export function useCrTable<T>(
//   props: CrTableProps<T>,
//   canSelectRow?: (item: any) => boolean,
//   onSelectionChange?: (items: Array<any>) => void
// ) {
//   const [selection] = useState(
//     new Selection({
//       canSelectItem: (item: any) => {
//         return canSelectRow ? canSelectRow(item) : true;
//       },
//       onSelectionChanged: () => {
//         onSelectionChange &&
//           onSelectionChange(selection.getSelection() as Array<T>);
//       },
//     })
//   );

//   const component = useMemo(() => {
//     return <CrTable {...props} selection={selection} />;
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [props.items, selection]);

//   return { selection, component };
// }

// function StickyScrollbarInner(props: StickyScrollbarProps) {
//   const { refTable, crfStageColElId } = props;

//   const refScrollbar = useRef(null);
//   const [isPositionBottom, setPositionBottom] = useState(false);

//   useEffect(() => {
//     const isFootbarExist =
//       document.getElementsByClassName("cr-footer-bar").length !== 0;

//     if (!isFootbarExist && !isPositionBottom) {
//       setPositionBottom(true);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     const wrapper =
//       !!refTable?.current && $(refTable?.current).find(".ms-DetailsList");
//     const scrollBar =
//       !!refScrollbar?.current && $(refScrollbar?.current).find("div");

//     let scrollBarAnchor = !!scrollBar?.length && scrollBar.find("span");
//     let wrapperWidth = 0;
//     let content: JQuery<HTMLElement>;
//     let contentWidth = 0;
//     let isScrolling = false;
//     let scrollStartX = 0;
//     let trackSize = 0;
//     let anchorOffset = 0;
//     let startAnchorOffset = 0;

//     const _onScroll = () => {
//       wrapperWidth = !!wrapper?.length && wrapper?.width();
//       content =
//         !!refTable?.current && $(refTable?.current).find(".ms-List-cell");
//       contentWidth = !!content.length && content?.width();

//       if (!wrapperWidth || !contentWidth) return;

//       trackSize = wrapperWidth * Math.max(0.05, wrapperWidth / contentWidth);
//       anchorOffset = (wrapperWidth * wrapper.scrollLeft()) / contentWidth;

//       scrollBarAnchor.css("left", `${anchorOffset}px`);
//       scrollBarAnchor.css("width", `${trackSize}px`);
//     };

//     const onScroll = debounce(_onScroll, 500);

//     const onMouseDown = (e: JQuery.Event) => {
//       isScrolling = true;
//       scrollStartX = e.clientX;
//       startAnchorOffset = anchorOffset;
//     };

//     const onMouseMove = (e: JQuery.Event) => {
//       if (!isScrolling) return;
//       anchorOffset = Math.min(
//         Math.max(0, startAnchorOffset + e.clientX - scrollStartX),
//         wrapperWidth - trackSize
//       );
//       wrapper.scrollLeft((anchorOffset * contentWidth) / wrapperWidth);
//       scrollBarAnchor.css("left", `${anchorOffset}px`);
//     };

//     const onMouseUp = () => {
//       isScrolling = false;
//     };

//     const onClick = (e: JQuery.Event) => {
//       anchorOffset = Math.min(
//         Math.max(0, e.offsetX - trackSize / 2),
//         wrapperWidth - trackSize
//       );
//       wrapper.scrollLeft((anchorOffset * contentWidth) / wrapperWidth);
//       scrollBarAnchor.css("left", `${anchorOffset}px`);
//     };

//     const onAnchorClick = (e: JQuery.Event) => {
//       e.stopPropagation();
//     };

//     $(window).on("resize", onScroll);
//     wrapper.on("scroll", _onScroll);
//     scrollBar.on("mousedown", onMouseDown);
//     scrollBar.on("click", onClick);
//     scrollBarAnchor.on("click", onAnchorClick);
//     $(document).on("mousemove", onMouseMove);
//     $(document).on("mouseup", onMouseUp);

//     _onScroll();
//     setTimeout(_onScroll, 50);

//     return () => {
//       const el = document.getElementById(crfStageColElId);
//       if (el) el.innerHTML = "";

//       $(window).off("resize", onScroll);
//       wrapper.off("scroll", _onScroll);
//       scrollBar.off("mousedown", onMouseDown);
//       scrollBar.off("click", onClick);
//       scrollBarAnchor.off("click", onAnchorClick);
//       $(document).off("mousemove", onMouseMove);
//       $(document).off("mouseup", onMouseUp);
//     };
//   });

//   return (
//     <>
//       <div
//         ref={refScrollbar}
//         className={classNames(
//           "cr-table--sticky-scrollbar",
//           isPositionBottom && "position--bottom"
//         )}
//       >
//         <div>
//           <span />
//         </div>
//       </div>
//     </>
//   );
// }

// function StickyScrollbar(props: StickyScrollbarProps) {
//   return (
//     <>
//       <StickyScrollbarInner {...props} />
//     </>
//   );
// }

// export function CrTable<T>(props: CrTableProps<T>) {
//   const {
//     className,
//     indexColumn,
//     groups,
//     headerVisible,
//     currentPage: currentPagex,
//     totalItems: totalItemsx,
//     itemsPerPage: itemsPerPagex,
//     items,
//     enableShimmer,
//     onSelectionChange,
//     onPageClick,
//     empty,
//     paginationEnabled,
//     rowAttributes,
//     canSelectRow,
//     childrenFooter,
//     selection: generatedSelection,
//     dataSelectionToggle,
//     hidePaginationWhenNotApplicable,
//     detailsListOnShouldVirtualizable,
//     stickyScrollbar,
//     message,
//     selectedRows,
//   } = props;
//   const totalItems = parseInt(String(totalItemsx), 10) || 0;
//   const currentPage = currentPagex || 1;
//   const itemsPerPage = itemsPerPagex || DEFAULT_RPP;
//   const refTable = useRef(null);

//   const defaultColumns: CrTableColumnProps<T>[] = indexColumn
//     ? [
//         {
//           key: "__index__" as any,
//           name: "No.",
//           type: "index",
//           map: (_item, index, _column) =>
//             totalItems
//               ? totalItems - (currentPage - 1) * itemsPerPage - (index || 0)
//               : index! + 1,
//         },
//       ]
//     : [];
//   const crfStageColElId = "app-crf-stage-col-summary";
//   const memoizedStickyScrollbar = useMemo(
//     () => StickyScrollbar({ refTable, crfStageColElId }),
//     [refTable]
//   );

//   const columns = columnsTransformer(
//     defaultColumns.concat(props.columns),
//     { crfStageColElId },
//     !items && enableShimmer,
//     message
//   );
//   const rowLink = props.rowLink;

//   const defaultSearchField = (() => {
//     if (props.searchField) return props.searchField;
//     else if (props.searchFields && props.searchFields.length > 0)
//       return props.searchFields[0].key as string;
//     return "";
//   })();
//   const [searchField, setSearchField] = useState<string>(defaultSearchField);
//   const [searchKeyword, setSearchKeyword] = useState<string>(
//     props.searchKeyword || ""
//   );
//   const [searchFieldEnums, setSearchFieldEnums] = useState<
//     { key: string | number; text: string }[] | undefined
//   >(props.searchFields?.find((e) => e.key === searchField)?.enums);
//   const [selectedRowsCount, setSelectedRowsCount] = useState<number>(0);

//   const onRenderDetailsHeader: IRenderFunction<IDetailsHeaderProps> = (
//     headerProps,
//     defaultRender
//   ) => {
//     const onRenderColumnHeaderTooltip: IRenderFunction<IDetailsColumnRenderTooltipProps> =
//       (columnProps, defaultRender) => {
//         const columnProp =
//           columnProps?.column?.key !== undefined
//             ? props.columns[
//                 (parseInt(columnProps?.column?.key as string, 10) || 0) -
//                   (props.indexColumn ? 1 : 0)
//               ]
//             : undefined;

//         if (!columnProp) {
//           return (
//             <div className="notranslate">{defaultRender!(columnProps)}</div>
//           );
//         }

//         const singleSearchStack = props.searchStacks?.find(
//           (x) =>
//             columnProp?.searchable &&
//             hasOwnProperty(columnProp?.searchable, "key") &&
//             x.key === columnProp?.searchable?.key
//         );
//         const rangeStartSearchStack = props.searchStacks?.find(
//           (x) =>
//             columnProp?.searchable &&
//             hasOwnProperty(columnProp?.searchable, "keyStart") &&
//             x.key === columnProp?.searchable?.keyStart &&
//             x.rangeWith === columnProp?.searchable?.keyEnd
//         );
//         const rangeEndSearchStack = props.searchStacks?.find(
//           (x) =>
//             columnProp?.searchable &&
//             hasOwnProperty(columnProp?.searchable, "keyStart") &&
//             x.key === columnProp?.searchable?.keyEnd &&
//             x.rangeBy === columnProp?.searchable?.keyStart
//         );

//         return (
//           <Header
//             name={columnProps?.column?.name || ""}
//             column={columnProp}
//             searchStack={
//               singleSearchStack
//                 ? singleSearchStack
//                 : rangeStartSearchStack && rangeEndSearchStack
//                 ? rangeStartSearchStack
//                 : undefined
//             }
//             searchStackRange={
//               rangeStartSearchStack && rangeEndSearchStack
//                 ? rangeEndSearchStack
//                 : undefined
//             }
//             query={props.query}
//             pushQuery={props.pushQuery}
//             removeQuery={props.removeQuery}
//             onRemoveSearchStack={(item) => {
//               if (props.removeQuery) {
//                 props.removeQuery(item.key);
//               } else if (props.onRemoveSearchStack) {
//                 props.onRemoveSearchStack(item);
//               }
//             }}
//             message={message}
//           />
//         );
//       };

//     const mergedProps: IDetailsHeaderProps = headerProps!;
//     mergedProps.onRenderColumnHeaderTooltip = onRenderColumnHeaderTooltip;

//     return defaultRender!(mergedProps);
//   };

//   const selection =
//     generatedSelection ||
//     new Selection({
//       canSelectItem: (item: any) => {
//         return canSelectRow ? canSelectRow(item) : true;
//       },
//       onSelectionChanged: () => {
//         setSelectedRowsCount(selection.getSelection().length);
//         onSelectionChange &&
//           onSelectionChange(selection.getSelection() as Array<T>);
//       },
//     });

//   if (props.defaultSelectedAll) {
//     setTimeout(() => {
//       selection.setAllSelected(true);
//     }, 0);
//   }

//   const search = (
//     field?: string | number | null,
//     keyword?: string | number | null
//   ) => {
//     const key = String(field || searchField);
//     const value = String(keyword || searchKeyword);

//     props &&
//       props.onSearchKeywordEnter &&
//       props.onSearchKeywordEnter({ [key]: value });
//   };

//   const searchStacks = props.searchStacks
//     ? cloneWith(props.searchStacks)
//     : null;

//   return (
//     <>
//       <div
//         ref={refTable}
//         className={classNames(
//           "cr-table",
//           !!rowLink && `with--row-link`,
//           className,
//           stickyScrollbar && `attr--sticky-scrollbar`
//         )}
//       >
//         {(props.rppChangeEnable ||
//           props.searchEnabled ||
//           searchStacks ||
//           (props.searchEnabled !== false && props.searchFields) ||
//           props.option) && (
//           <div className="cr-table-search rtl">
//             <div className="left rpp">
//               {props.option && (
//                 <div className={"option"}>
//                   <CrCheckbox
//                     label={props.option.label}
//                     defaultChecked={props.option.defaultChecked}
//                     onValueChange={(val, isInitial) =>
//                       props.option.onValueChanged(val, isInitial)
//                     }
//                   />
//                 </div>
//               )}
//               {props.rppChangeEnable && props.rppFields && (
//                 <>
//                   {props.option && <div className="spacer" />}
//                   <div className="label">View</div>
//                   <CrDropdown
//                     defaultKey={
//                       (props.rppFields.find(
//                         (e) => e.key === String(itemsPerPage)
//                       )?.key as string) ||
//                       (props.rppFields[0]?.key as string) ||
//                       undefined
//                     }
//                     items={props.rppFields}
//                     onValueChange={(val) =>
//                       props &&
//                       props.onRppChange &&
//                       props.onRppChange(val as string)
//                     }
//                   />
//                   <div className="label">Rows</div>
//                 </>
//               )}
//             </div>
//             <div className="right search">
//               {searchStacks && searchStacks.filter((x) => x.val).length > 0 && (
//                 <ul className="cr-table-search-stacks">
//                   {searchStacks
//                     .filter((x) => x.val)
//                     .map((x, xi) => {
//                       const maxlen = Math.max(
//                         (x.rangeBy || x.rangeWith ? 40 : 30) -
//                           (x.keyLabel || x.key).length,
//                         10
//                       );
//                       let vals = arrayify((x.valLabel || x.val) as string).join(
//                         ", "
//                       );
//                       let range: CrTableSearchStack;

//                       if (x.silent) {
//                         return <Fragment key={xi}></Fragment>;
//                       }

//                       if (x.rangeBy) {
//                         ((p) => {
//                           if (p) {
//                             range = p;
//                             p.silent = true;
//                             vals = String(
//                               arrayify((p.valLabel || p.val) as string).join(
//                                 ", "
//                               ) +
//                                 " ~ " +
//                                 vals
//                             ).trim();
//                           }
//                         })(searchStacks.find((k) => k.key === x.rangeBy));
//                       } else if (x.rangeWith) {
//                         ((p) => {
//                           if (p) {
//                             range = p;
//                             p.silent = true;
//                             vals = String(
//                               vals +
//                                 " ~ " +
//                                 arrayify((p.valLabel || p.val) as string).join(
//                                   ", "
//                                 )
//                             ).trim();
//                           }
//                         })(searchStacks.find((k) => k.key === x.rangeWith));
//                       }

//                       return (
//                         <li className="cr-table-search-stack" key={xi}>
//                           <CrButton
//                             text={`${x.keyLabel || x.key} (${
//                               vals.length > maxlen
//                                 ? `${vals.substring(0, maxlen)}..`
//                                 : vals
//                             })`}
//                             onClick={() => {
//                               if (props.removeQuery) {
//                                 props.removeQuery(x.key);
//                                 range && props.removeQuery(range.key);
//                               } else if (props.onRemoveSearchStack) {
//                                 props.onRemoveSearchStack(x);
//                               }
//                             }}
//                           />
//                         </li>
//                       );
//                     })}
//                 </ul>
//               )}
//               {props.searchFields && (
//                 <CrDropdown
//                   defaultKey={
//                     searchField || (props.searchFields[0]?.key as string)
//                   }
//                   items={props.searchFields}
//                   onValueChange={(val) => {
//                     setSearchField(val as string);
//                     const enums = props.searchFields?.find(
//                       (e) => e.key === (val as string)
//                     )?.enums;

//                     if (enums && enums.length > 0) {
//                       if (props.autoSearchEnable) {
//                         search(val, searchKeyword || enums[0].key);
//                       }
//                       setSearchKeyword(
//                         props.autoSearchEnable
//                           ? searchKeyword
//                           : (enums[0].key as string)
//                       );
//                       setSearchFieldEnums(enums);
//                     } else {
//                       if (searchFieldEnums) setSearchKeyword("");
//                       setSearchFieldEnums(undefined);
//                     }
//                   }}
//                 />
//               )}{" "}
//               {searchFieldEnums && searchFieldEnums.length > 0 && (
//                 <CrDropdown
//                   className="--search"
//                   defaultKey={
//                     searchKeyword || (searchFieldEnums[0].key as string)
//                   }
//                   items={searchFieldEnums}
//                   onValueChange={(val) => {
//                     setSearchKeyword(val as string);

//                     if (props.autoSearchEnable) {
//                       search(searchField, val);
//                     }
//                   }}
//                 />
//               )}
//               {(props.searchEnabled || props.searchFields) && (
//                 <>
//                   {!searchFieldEnums && (
//                     <CrInput
//                       autoFocus
//                       defaultValue={searchKeyword}
//                       onValueChange={(val) => setSearchKeyword(val)}
//                       onEnterKeyDown={() => search()}
//                     >
//                       {" "}
//                     </CrInput>
//                   )}
//                   {!props.autoSearchEnable && (
//                     <CrButton text="Search" onClick={() => search()} />
//                   )}
//                 </>
//               )}
//             </div>
//           </div>
//         )}
//         <DetailsList
//           className={classNames(
//             "cr-table-wrapped",
//             !items?.length && "--empty"
//           )}
//           columns={columns}
//           groups={groups}
//           items={items || (enableShimmer ? [{}] : [])}
//           checkboxVisibility={CheckboxVisibility.always}
//           isHeaderVisible={headerVisible}
//           getKey={(item) => item.key}
//           selection={selection}
//           selectionPreservedOnEmptyClick={true}
//           onShouldVirtualize={() => detailsListOnShouldVirtualizable}
//           onRenderDetailsHeader={onRenderDetailsHeader}
//           onRenderRow={(rowProps) => {
//             if (rowProps) {
//               const { className, ...extras } = rowProps;
//               const attributes = rowAttributes && rowAttributes(rowProps.item);

//               const row = (
//                 <DetailsRow
//                   data-selection-toggle={dataSelectionToggle}
//                   className={classNames(
//                     className,
//                     attributes?.className,
//                     attributes?.faded && "--faded",
//                     attributes?.danger && "--danger",
//                     attributes?.warn && "--warn",
//                     attributes?.succ && "--succ",
//                     attributes?.info && "--info",
//                     attributes?.bold && "--bold",
//                     attributes?.strike && "--strike",
//                     attributes?.italic && "--italic",
//                     attributes?.align && `--${attributes?.align}`
//                   )}
//                   {...extras}
//                 />
//               );

//               if (!!items?.length && rowLink) {
//                 const linkTo = rowLink(rowProps.item);

//                 if (linkTo) {
//                   return (
//                     <>
//                       {row}
//                       <Link
//                         className={classNames(
//                           "cr-table--row-link",
//                           !!props.columns.find((e) => e.type === "menu") &&
//                             `with--misc`
//                         )}
//                         to={linkTo}
//                       >
//                         Link
//                       </Link>
//                     </>
//                   );
//                 }
//               }

//               return <>{row}</>;
//             }

//             return null;
//           }}
//           selectionMode={((mode) => {
//             if (mode === "single") return SelectionMode.single;
//             if (mode === "multiple") return SelectionMode.multiple;
//             else return SelectionMode.none;
//           })(props.selectionMode)}
//           layoutMode={DetailsListLayoutMode.justified}
//         />
//         {stickyScrollbar && memoizedStickyScrollbar}
//         {(!items || !items.length) &&
//           !enableShimmer &&
//           !childrenFooter &&
//           (empty || (
//             <>
//               <Stack horizontalAlign="center" className="cr-table-empty">
//                 There is no available item.
//               </Stack>
//             </>
//           ))}
//         {childrenFooter && (
//           <div className="cr-table-child-footer">{childrenFooter}</div>
//         )}
//         {selectedRows && selectedRowsCount ? (
//           <div className="cr-table-selected-rows">
//             <span>
//               {typeof selectedRows.textTemplate === "function"
//                 ? selectedRows.textTemplate(selectedRowsCount)
//                 : `${selectedRowsCount} ${
//                     selectedRowsCount === 1 ? "row" : "rows"
//                   } selected`}
//             </span>
//             <CrIconButton
//               icon="More"
//               menuItems={
//                 typeof selectedRows.contextMenu === "function"
//                   ? selectedRows.contextMenu(selectedRowsCount)
//                   : selectedRows.contextMenu
//               }
//             />
//           </div>
//         ) : null}
//         {paginationEnabled && (
//           <CrPagination
//             hideWhenNotApplicable={hidePaginationWhenNotApplicable}
//             currentPage={currentPage}
//             totalItems={totalItems || 0}
//             itemsPerPage={itemsPerPage}
//             onPageClick={onPageClick || (() => {})}
//           />
//         )}
//       </div>
//     </>
//   );
// }

// CrTable.defaultProps = {
//   paginationEnabled: true,
//   headerVisible: true,
//   autoSearchEnable: false,
//   detailsListOnShouldVirtualizable: false,
//   rppFields: [
//     {
//       key: "10",
//       text: "10",
//     },
//     {
//       key: "25",
//       text: "25",
//     },
//     {
//       key: "50",
//       text: "50",
//     },
//     {
//       key: "100",
//       text: "100",
//     },
//   ],
// };
