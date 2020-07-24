import Widget from "../../../components/Crescent/Widget/Widget";
import {mapActions, mapState} from "vuex";
import validators from "vue-form-generator/src/utils/validators";

export default {
    components: {Widget},
    data() {
        return {
            form: {
                schema: {
                    fields: [{
                        type: 'input',
                        inputType: 'text',
                        id: "inputUsername",
                        model: "username",
                        placeholder: '账号',
                        required: true,
                        validator: validators.string.locale({
                            fieldIsRequired: "The username is required!"
                        })
                    }, {
                        type: 'input',
                        inputType: 'password',
                        id: 'inputPassword',
                        model: "password",
                        placeholder: '密码',
                        required: true,
                        validator: validators.string.locale({
                            fieldIsRequired: "The password is required!"
                        })
                    }]
                },
                model: {
                    username: null,
                    password: null
                },
                options: {
                    validateAfterLoad: false,
                    validateAfterChanged: true,
                    validateAsync: true
                }
            },
            userType: {
                0: '教师',
                1: '二级学院课题管理员',
                13: '外审专家',
                14: '课题立项系统管理员'
            }
        };
    },
    methods: {
        ...mapActions('global', ['updateAccountState']),
        login() {
            this.$refs.vfg.validate().then((res) => {
                if (res.length===0) {
                    this.$axios.post(this.host + 'basic/login', {
                        username: this.form.model.username,
                        password: this.form.model.password
                    }).then((res) => {
                        if (res.data.loginState) {
                            res.data.type = this.userType[res.data.level];
                            this.updateAccountState(res.data);
                            if (res.data.level === 13) {
                                this.$router.push('/Crescent/audit/expertDash').then();
                            } else {
                                this.$router.push('/Crescent/bulletin/dash').then();
                            }
                        } else {
                            this.$bvToast.show('submit-login');
                        }
                    })
                }
            })
        },
    },
    computed: {
        ...mapState('global', ['host'])
    },
    mounted() {
        let that = this;
        this.$('#inputPassword').keypress(function(event){
            let keyCode = (event.keyCode ? event.keyCode : event.which);
            if(keyCode === 13){
                that.login();
            }
        });
    }
};