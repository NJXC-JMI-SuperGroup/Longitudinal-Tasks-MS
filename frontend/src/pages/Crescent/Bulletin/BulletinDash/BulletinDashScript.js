import Vue from 'vue'
import validators from "vue-form-generator/src/utils/validators";

export default {
    data() {
        return {
            easytable: {
                tableData: [
                    {"title":"xxx公告","state":"正常", "category":"科技创新", "level":"校级课题","dept":"xxxxx","deadline":"2021-12-21"},
                    {"title":"xxx公告","state":"正常", "category":"科技创新", "level":"校级课题","dept":"xxxxx","deadline":"2021-12-21"},
                    {"title":"xxx公告","state":"正常", "category":"科技创新", "level":"校级课题","dept":"xxxxx","deadline":"2021-12-21"},
                    {"title":"xxx公告","state":"正常", "category":"科技创新", "level":"校级课题","dept":"xxxxx","deadline":"2021-12-21"},
                    {"title":"xxx公告","state":"正常", "category":"科技创新", "level":"校级课题","dept":"xxxxx","deadline":"2021-12-21"},
                    {"title":"xxx公告","state":"正常", "category":"科技创新", "level":"校级课题","dept":"xxxxx","deadline":"2021-12-21"},
                    {"title":"xxx公告","state":"正常", "category":"科技创新", "level":"校级课题","dept":"xxxxx","deadline":"2021-12-21"},
                    {"title":"xxx公告","state":"正常", "category":"科技创新", "level":"校级课题","dept":"xxxxx","deadline":"2021-12-21"},
                    {"title":"xxx公告","state":"正常", "category":"科技创新", "level":"校级课题","dept":"xxxxx","deadline":"2021-12-21"},
                    {"title":"xxx公告","state":"正常", "category":"科技创新", "level":"校级课题","dept":"xxxxx","deadline":"2021-12-21"}
                ],
                columns: [
                    {field: 'title', title: '课题', width: 140, titleAlign: 'left', columnAlign: 'left',isResize:true},
                    {field: 'state', title: '状态', width: 60, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'category', title: '课题类型', width: 60, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'level', title: '课题级别', width: 60, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'dept', title: '发布单位', width: 80, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'deadline', title: '截止时间', width: 75, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'custom-adv', title: '操作',width: 200, titleAlign: 'center',columnAlign:'center',componentName:'table-operation-bulletin',isResize:true}
                ]
            },
            form: {
                schema: {
                    groups: [{
                        legend: '课题信息',
                        fields: [{
                            type: 'input',
                            inputType: 'text',
                            label: '课题标题',
                            placeholder: '课题标题',
                            id: 'showTitle',
                            readonly: true
                        }, {
                            type: "input",
                            inputType: 'text',
                            id: "showDept",
                            label: "课题发布单位",
                            placeholder: '单位',
                            readonly: true
                        }, {
                            type: "input",
                            inputType: 'text',
                            label: "课题类型",
                            id: "showCategory",
                            placeholder: "类型",
                            readonly: true
                        }, {
                            type: "input",
                            inputType: 'text',
                            id: "showLimit",
                            label: "课题是否限项",
                            model: "isLimit",
                            readonly: true
                        }, {
                            type: "input",
                            inputType: "number",
                            id: "showLimitNumber",
                            label: "课题限项数目",
                            visible: function (model) {
                                return model.isLimit;
                            },
                            validator: validators.integer,
                            readonly: true
                        }, {
                            type: "input",
                            id: "showLevel",
                            inputType: "text",
                            label: "课题级别",
                            readonly: true
                        }, {
                            type: "input",
                            id: "showDeadline",
                            inputType: "text",
                            label: "课题申报截止时间",
                            model: "deadline",
                            readonly: true
                        }]
                    }, {
                        legend: '课题通知内容'
                    }]
                },
                model: {
                    isLimit: true,
                    limitNumber: 0,
                    deadline: new Date()
                },
                options: {
                    validateAfterLoad: true,
                    validateAfterChanged: true,
                    validateAsync: true
                }
            },
            showContent: `
                <div class="cw--c">
\t\t\t\t\t\t\t\t<div class="logo-wrap--home">
\t\t\t<a id="logo_homepage_link" class="logo_homepage" href="/about">
\t\t\t\tAbout DuckDuckGo
\t\t\t\t<span class="logo_homepage__tt">Learn More</span>
\t\t\t</a>
\t\t</div>

\t\t\t\t\t\t<div class="search-wrap--home">
\t\t\t\t\t\t\t\t\t<form id="search_form_homepage" class="search--home  js-search-form search--adv" name="x" method="GET" action="/">
\t\t\t<input id="search_form_input_homepage" class="js-search-input search__input--adv" type="text" autocomplete="off" name="q" tabindex="1" value="" autocapitalize="off" autocorrect="off" placeholder="Search the web without being tracked">
\t\t\t<input id="search_button_homepage" class="search__button  js-search-button" type="submit" tabindex="2" value="S">
\t\t\t<input id="search_form_input_clear" class="search__clear  empty  js-search-clear" type="button" tabindex="3" value="X">
\t\t\t<div id="search_elements_hidden" class="search__hidden  js-search-hidden"><input type="hidden" class="js-search-hidden-field" name="t" value="hk"></div>
\t\t<div class="search__autocomplete" style="display: none;"><div class="acp-wrap js-acp-wrap"></div><div class="acp-footer is-hidden js-acp-footer"><span class="acp-footer__instructions">Shortcuts to other sites to search off DuckDuckGo</span><span class="acp-footer__link"><a class="no-visited js-acp-footer-link" href="/bang">Learn More</a></span></div></div></form>

\t\t\t\t\t\t</div>
\t\t
\t

\t\t\t\t\t\t<!-- en_US All Settings -->
<noscript>
    <div class="tag-home">
        <div class="tag-home__wrapper">
            <div class="tag-home__item">
                Privacy, simplified&period;
                <span class="hide--screen-xs"><a href="/about" class="tag-home__link">Learn More</a>.</span>
            </div>
        </div>
    </div>
</noscript>
<div class="tag-home  tag-home--slide  no-js__hide  js-tag-home"><div class="tag-home__wrapper"><div class="tag-home__item">Privacy, simplified.<span class="hide--screen-xs"> <a class="tag-home__link js-tag-item-link" href="/spread">Help Spread DuckDuckGo!</a></span></div></div></div>
<div id="error_homepage"></div>


\t
\t\t
\t\t\t\t\t</div>
            `
        }
    },
    methods:{
        customCompFunc(params){
            console.log(params);
            alert(`${params.index} ${params.rowData['title']}`)
        }
    }
}
Vue.component('table-operation-bulletin',{
    template:`
        <span>
            <a @click.stop.prevent="showModel(rowData,index)">查看</a>&nbsp;
            <a @click.stop.prevent="update(rowData,index)">更新</a>
        </span>`,
    props:{
        rowData:{
            type:Object
        },
        field:{
            type:String
        },
        index:{
            type:Number
        }
    },
    methods:{
        update(){
            // 参数根据业务场景随意构造
            // let params = {type:'edit',index:this.index,rowData:this.rowData};
            // this.$emit('on-custom-comp',params);
            this.$router.push('/Crescent/bulletin/dash/modify')
        },
        showModel() {
            this.$bvModal.show('modal-scrollable')
        }
    }
})