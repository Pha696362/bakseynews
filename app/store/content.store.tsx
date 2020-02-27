
import { observable, action } from 'mobx'
import { ContentRefLoad, updatecontentRef } from '../services/data.service';
import { pushToArray, pushToObject } from '../services/mapping.service';
import { appConfig } from '../dummy/appConfig';

export default class CONTENTSTORE {
    @observable dataContent: any[] = [];
    @observable loading: boolean = true;
    @observable selectedDetail: any = null
    @observable lastVisable: any = null
    @observable loadingMore: boolean = false
    @observable loadingRefresh: boolean = false
    @observable dataSelected: any = null;
    @observable homeSlide: any[] = [];
    @observable imageDocs: any[] = []
    @observable contentLastVisible: any = null;


    @observable dataSpecial: Array<any> = [];




    @action
    fetchContent(categoryKey: string) {
        this.loading = true;
        this.contentLastVisible = null;
        if (categoryKey) {
            ContentRefLoad(this.contentLastVisible, categoryKey)
                .get()
                .then(item => {
                    const data = pushToArray(item);
                    this.homeSlide = [];
                    if (item.size === appConfig.size) {
                        this.contentLastVisible = data[data.length - 1];
                    } else {
                        this.contentLastVisible = null;
                    }
                    this.dataContent = data;
                    this.dataSpecial = data.splice(0, 3)
                    console.log('this.dataSepcial with category', this.dataSpecial)
                    this.loading = false;
                })
                .catch(e => {
                    this.contentLastVisible = null;
                    this.dataContent = [];
                    this.loading = false;
                });
        } else {
            ContentRefLoad(this.contentLastVisible)
                .get()
                .then(item => {
                    const data = pushToArray(item);
                    this.homeSlide = [];
                    if (item.size === appConfig.size) {
                        this.contentLastVisible = data[data.length - 1];
                    } else {
                        this.contentLastVisible = null;
                    }
                    this.dataContent = data;
                    // console.log('this.dataContent without category', this.dataContent)
                    this.dataSpecial = data.splice(0, 6)
                    // console.log('this.dataSepcial without category', this.dataSpecial)
                    this.loading = false;
                })
                .catch(e => {
                    this.contentLastVisible = null;
                    this.dataContent = [];
                    this.loading = false;
                });
        }
    }

    @action
    fetchRefreshContent(categoryKey: string) {
        this.loadingRefresh = true;
        this.contentLastVisible = null;
        if (categoryKey) {
            ContentRefLoad(this.contentLastVisible, categoryKey)
                .get()
                .then(item => {
                    const data = pushToArray(item);
                    this.homeSlide = [];
                    if (item.size === appConfig.size) {
                        this.contentLastVisible = data[data.length - 1];
                    } else {
                        this.contentLastVisible = null;
                    }
                    this.dataContent = data;
                    this.loadingRefresh = false;
                })
                .catch(e => {
                    this.contentLastVisible = null;
                    this.dataContent = [];
                    this.loadingRefresh = false;
                });

        }
    }

    @action
    fetchMoreContent(categoryKey: string) {
        // console.log('categoryKey :', categoryKey);
        if (!this.contentLastVisible || this.loadingMore) return;
        this.loadingMore = true;
        if (categoryKey) {
            ContentRefLoad(this.contentLastVisible, categoryKey)
                .get()
                .then(item => {
                    const data = pushToArray(item);
                    if (item.size === appConfig.size) {
                        this.contentLastVisible = data[data.length - 1];
                    } else {
                        this.contentLastVisible = null;
                    }
                    this.dataContent = this.dataContent.concat(data);
                    this.loadingMore = false;
                })
                .catch(e => {
                    this.contentLastVisible = null;
                    this.dataContent = [];
                    this.loadingMore = false;
                });
        } else {
            ContentRefLoad(this.contentLastVisible, categoryKey)
                .get()
                .then(item => {
                    const data = pushToArray(item);
                    if (item.size === appConfig.size) {
                        this.contentLastVisible = data[data.length - 1];
                    } else {
                        this.contentLastVisible = null;
                    }
                    this.dataContent = this.dataContent.concat(data);
                    this.loadingMore = false;
                })
                .catch(e => {
                    this.contentLastVisible = null;
                    this.dataContent = [];
                    this.loadingMore = false;
                });
        }
    }


    @action
    fetchDetail(item: any) {
        this.selectedDetail = item
    }

    //     @action
    //   async updateTopView(key: any) {
    //     const data: any = await updatecontentRef()
    //       .doc(key)
    //       .get();
    //     const top_view: any = pushToObject(data);
    //     const number: number = top_view.top_view + 1;
    //     await updatecontentRef()
    //       .doc(key)
    //       .update("top_view", number);
    //   }

    @action
    async updateTopView(key: any) {
        const data: any = await updatecontentRef()
            .doc(key)
            .get();
        const top_view: any = pushToObject(data);
        const number: number = top_view.top_view + 1;
        await updatecontentRef()
            .doc(key)
            .update("top_view", number);
    }
    @action
    async fetchImageGallary(item: any) {
        this.loading = true;
        this.imageDocs = await item.map((m: any) => { return m.url }

        )
        this.loading = false;

    }
}


