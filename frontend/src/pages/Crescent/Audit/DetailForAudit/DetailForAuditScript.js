export default {
    data() {
        return {
            form: {
                schema: {
                    bulletin: this.$store.state.global.schema.bulletin,
                    declare: this.$store.state.global.schema.declare
                },
                model: {
                    bulletin: this.$store.state.global.model.bulletin,
                    declare: this.$store.state.global.model.declare
                }
            }
        }
    }
}