import Widget from "../../../components/Crescent/Widget/Widget";
import {mapActions} from "vuex";
import validators from "vue-form-generator/src/utils/validators";
import boolean from "less/lib/less/functions/boolean";

export default {
    components: {Widget},
    data() {
        return {
            username: '',
            password: '',
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
            }
        };
    },
    methods: {
        ...mapActions('global', ['updateUserLevel']),
        login() {
            this.$refs.vfg.validate().then((res) => {
                if (res.length) {
                } else {
                    // eslint-disable-next-line no-console
                    console.info('commit');
                }
            })
        },
    }
};