//@ts-nocheck
import create from "zustand";

import {
  setSelectedPageAction,
  tryGetKewordsByCategoryAction,
  tryGetKeywordSummaryListAction,
  setCampiagnTestByKeywordAction,
  tryPostCreateCampaignTest,
  tryPostLinkPageToAdwordsAction,
  tryPublishPage,
  tryGetCampaignTestByKeywordAction,
  setSelectedKwdAction,
  setSelectedLabelKwdAction,
  tryGetRuleCampaignsAction,
  setNextSelectedIndexAction,
  resetPublishSuccessStatusAction,
  resetLinkSuccessStatusAction,
  resetCreateSuccessStatusAction,
  resetCampiagnTestByKeywordAction,
  tryGetCampainDetailsAction,
  tryGetKeywordPagesAction
} from "src/PageGeneration/store/actions";
import { getlabelFromId } from "src/shared/utils";
import {updateUrl, getUrlParams } from "src/hooks/useUrlSearchParams";
import { keywordPage_QParamsType } from "src/PageGeneration/shared/page_query_params";
import { store } from "src";

export const useKeywordsStore = create((set, get) => {
  //const {getQueryParams, updateUrl} = searchParamFn;
  const DEFAULT_LIMIT = 10;

  const [_currentPaginationPage, _campaignId, _ruleId, _k_limit, _K_offset, _category, _keywordId, _pageId] =
   getUrlParams(keywordPage_QParamsType);
  console.log([_currentPaginationPage, _campaignId, _ruleId, _k_limit, _K_offset, _category, _keywordId, _pageId]);

  // const storedCampain = useFetchCampainDetails(_ruleId, _campaignId);

  return {
    selectedPage: null,
    // onCheckKeyword: null,
    // currentCategory: 'pending',
    // selectedKeyword: null,
    // selectedLabel: null,
    // keywordValue: null,
    // minScore:null,
    // maxScore:null,
    // keywordsToBePublished: [],
    // pagination: { limit: _k_limit || 10, offset: _K_offset || 0 },
    // paginationPage: _currentPaginationPage || 1,
    // emptyCategory: false,
    // openCampaignModal: false,
    // displayAlertMessage: () => get().publishSuccess || false,
    // categoryCheckAll: false,
    // filterCategoryPopUp: [{ name: "pending", value: true }, { name: "published", value: true }, { name: "linked", value: true }],
    // defaultFilters: {
    //     keywordValue: null,
    //     min: null,
    //     max: null,
    //     ruleId: _ruleId,
    //     page: () => get().paginationPage,
    //     category: (get) => get().currentCategory,
    //     campainId: _campaignId,
    //     ...(() => get().pagination),
    // },
    // storedKeywordsSummary: null,
    // storedPages:null,
    // storedKwdByCategoryResult:null,
    // publishSuccess: null,
    // linkSuccess:null,
    // storedPage:null,
    // storedSelectKeyword: null,
    // storedNextSelectedIndex: null,
    // storedCampain: null,

    actions: {
      setSelectedPage: selectedPage => set({selectedPage}),
      getSelectedPage: () => get().selectedPage

      //     init(){
      //         console.log('init')
      //         store.dispatch(tryGetCampainDetailsAction({ id: _ruleId, campaign_id: _campaignId }));
      //         store.dispatch( resetPublishSuccessStatusAction());
      //         store.dispatch( resetLinkSuccessStatusAction());
      //         get().actions.loadKeywordsData();
      //     },
      //     getFilters(category: string = 'pending', page: any = 1, offset: any = 0, limit: any= 10){
      //         return {...get().defaultFilters,  category: get().category,  page: get().page,  };
      //     },
      //     loadKeywordsData(filters?: any){
      //         store.dispatch(tryGetKeywordSummaryListAction({ ruleId: _ruleId, campainId: _campaignId }));
      //         store.dispatch(tryGetKewordsByCategoryAction(filters ||  get().defaultFilters));
      //     },
      //     resetCheckAllCategories(checkAllCategories: boolean = false, keywordIdsTobePublished: number[] = [] ){
      //             set({checkAllCategories});
      //             set({keywordIdsTobePublished});
      //     },
      //     changeFilterCategoryPopUp(event: React.ChangeEvent<HTMLInputElement>, catName){

      //         const val = event.target.checked;
      //         let _countCheckFilter = 0
      //         let newFilteredArr = []
      //         __.forEach(filterCategoryPopUp, (item) => {
      //           if (item.name === catName) {
      //             if (val) _countCheckFilter = _countCheckFilter + 1
      //             newFilteredArr.push({ name: item.name, value: val })
      //           } else {
      //             if (item.value) _countCheckFilter = _countCheckFilter + 1
      //             newFilteredArr.push(item)
      //           }
      //         })
      //         _countCheckFilter !== 0 && set({filterCategoryPopUp: newFilteredArr})
      //       },
      //     resetStatus() {
      //     store.dispatch(createTestStatusAction(null))
      //     store.dispatch(linkToAdsStatusAction(null))

      //     },

      //     onCloseLinkToCampaign(){
      //     set({openCampaignModal : false});
      //     store.dispatch(resetCampiagnTestByKeywordAction(null));
      //     get().resetStatus()
      //     get().resetCheckAllCategories();

      //     },

      //     onLinkSinglePage(){
      //     get().resetCheckAllCategories();
      //     get().onLinktoKPage()
      //     },

      //     onLinktoKPage(){
      //         get().resetStatus();
      //         store.dispatch(resetLinkSuccessStatusAction())
      //         store.dispatch(resetCreateSuccessStatusAction())
      //         set({openCampaignModal : true});
      //     },

      //     onPublish(){
      //         const filters = { ...defaultFilters, offset: _K_offset, category: currentCategory };
      //         tryPublishPage({
      //             pages_data: [
      //             {
      //                 page_id:  get().storedPage.page_id.toString(),
      //                 keyword_id:  get().storedSelectKeyword,
      //             },
      //             ],
      //         })
      //         store.dispatch(tryGetKewordsByCategoryAction(filters));
      //         store.dispatch(setNextSelectedIndexAction(getNextIndex(_keywordId, false)));
      //     },

      //     onChangeCategory(categoryName: string){

      //         const keywordSummary =  get().storedKeywordsSummary.filter((category) => category.name === categoryName)[0];
      //         if (0 !== keywordSummary.keyword_count) {

      //             set({paginationPage : 1});
      //             updateUrl('catgeory', categoryName);
      //             updateUrl('k_offset', "0");
      //             updateUrl('pageNumber', '0');

      //             set({emptyCategory : false});

      //             const filters = { ...get().defaultFilters, offset: 0, category: categoryName, keywordValue: get().keywordValue, min: get().minScore, max: get().maxScore };
      //             set({currentCategory : categoryName});
      //             store.dispatch(tryGetKewordsByCategoryAction(filters));
      //         //   get().resetCheckAllCategories();

      //     }

      //     },

      //     restorePagination(keywordValue, min_score, max_score){
      //         set({keywordValue});
      //         set({minScore: min_score});
      //         set({maxScore: max_score});
      //         set({paginationPage: 1});
      //     },
      //     onSelectKeword(keywordId: number){
      //         console.log('on select keyword');
      //         store.dispatch(
      //         tryGetKeywordPagesAction({
      //             keyword_id: keywordId,
      //             rule_id: _ruleId,
      //         })
      //         );
      //         updateUrl('keywordId', "" + keywordId);
      //         updateUrl('k_offset', get().pagination.offset);
      //         updateUrl('k_limit', DEFAULT_LIMIT);
      //         updateUrl('pageNumber', get().paginationPage);

      //         const category = get().storedKwdByCategoryResult.results.filter((kwd) => kwd.id === keywordId)[0].category;
      //         updateUrl('category', category);

      //         store.dispatch(setSelectedKwdAction(keywordId));

      //         store.dispatch(setSelectedLabelKwdAction(getlabelFromId(keywordId, get().storedKwdByCategoryResult)));
      //         set({selectedLabel: getlabelFromId(keywordId, get().storedKwdByCategoryResult)});

      //         updateUrl('kwdLabel', getlabelFromId(keywordId, get().storedKwdByCategoryResult));
      //         set({selectedKeyword: keywordId});
      //     },

      // getNextIndex(keywordId: number, changeOffset = true){
      //     let nextIndex = null;

      //     get().storedKwdByCategoryResult.results.forEach((kwd, idx) => {
      //     if (kwd.id === keywordId) {
      //         nextIndex = idx < 9 ? idx + 1 : 9;
      //     }
      //     });

      //     return nextIndex;
      // },

      // getKeywordByIndex(index: number){
      //     return get().storedKwdByCategoryResult.results.find((elem, idx) => idx === index);
      // },

      // onCheckKeyword(keyword: number){
      //     if (get().keywordIdsTobePublished.includes(keyword)) {
      //     get().keywordsToBePublished.splice(get().keywordsToBePublished.indexOf(keyword), 1);
      //     set({keywordsToBePublished: [...keywordsToBePublished]});

      //     } else {
      //     set({keywordsToBePublished: [...get().keywordsToBePublished, keyword]});
      //     }
      // },

      // paginate(_page){
      //     const page = Number(_page)
      //     updateUrl('pageNumber', page);
      //     updateUrl('k_limit', DEFAULT_LIMIT);
      //     const newPagination = { offset: (page - 1) * DEFAULT_LIMIT };
      //     updateUrl('k_offset', newPagination.offset + "");
      //     set({pagination: { ...get().pagination, offset: (page - 1) * DEFAULT_LIMIT }});
      //     set({paginationPage: page});

      //     store.dispatch(
      //     tryGetKewordsByCategoryAction({ ...get().defaultFilters, ...newPagination, keywordValue: get().keywordValue, min:  get().minScore, max:  get().maxScore })
      //     );
      //     get().resetCheckAllCategories();

      // },

      // onSelectPage(page: any){
      //     updateUrl('pageId', page.page_id)
      //     store.dispatch(setSelectedPageAction(page));
      // },

      // getNextCategory(categoryName: string){
      //     switch (categoryName) {
      //     case 'pending':
      //         return 'published';
      //     case 'published':
      //         return 'linked';
      //     }
      // },
      // goToNextCategory(){
      //     const nextCategory = get().getNextCategory(currentCategory);
      //     set({currentCategory: nextCategory});

      //     store.dispatch(resetPublishSuccessStatusAction());
      //     store.dispatch(resetLinkSuccessStatusAction());
      //     store.dispatch(resetCreateSuccessStatusAction());
      //     window.setTimeout( set({displayAlertMessage: false}), 4000);

      // },

      // publishPages(){
      //     const pages = get().storedKwdByCategoryResult.results
      //     .filter((keywords) => get().keywordsToBePublished.includes(keywords.id))
      //     .map((keyword) => ({ page_id: keyword.page_ids[0], keyword_id: "" + keyword.id }))

      //     store.dispatch(tryPublishPage({ pages_data: pages }));
      // },
      //     setCurrentCategory(currentCategory) { set({currentCategory}) },
      //     setCategoryCheckAll(categoryCheckAll){  set({categoryCheckAll})},
      //     setKeywordsToBePublished(keywordsToBePublished) {  set({keywordsToBePublished})},
      //     setEmptyCategory(emptyCategory) {  set({emptyCategory})},
      //     setSelectedKeyword(selectedKeyword) {  set({selectedKeyword})},

      //     setStoredPages(storedPages) { set({storedPages}) },
      //     setStoredKwdByCategoryResult(storedKwdByCategoryResult) { set({storedKwdByCategoryResult}) },
      //     setPublishSuccess(publishSuccess) { set({publishSuccess}) },
      //     setLinkSuccess(linkSuccess) { set({linkSuccess}) },
      //     setStoredPage(storedPage) { set({storedPage}) },
      //     setStoredSelectKeyword(storedSelectKeyword) { set({storedSelectKeyword}) },
      //     setStoredNextSelectedIndex(storedNextSelectedIndex) { set({storedNextSelectedIndex}) },
      //     setStoredCampain(storedCampain) { set({storedCampain}) },
      //     setStoredKeywordsSummary(storedKeywordsSummary) {
      //         set({storedKeywordsSummary})
      //    },

    }

  };
});
