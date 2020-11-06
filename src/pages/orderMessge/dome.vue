<template>
  <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
    <a-form-model-item has-feedback label="Age" prop="age">
      <a-input v-model.number="ruleForm.age" />
    </a-form-model-item>
  </a-form-model>
</template>

<script>

export default {
  name: "dome",
  
  data(){
    // let checkPending;
    // let checkAge = (rule, value, callback) => {
    //   clearTimeout(checkPending);
    //   if (!value) {
    //     return callback(new Error('Please input the age'));
    //   }
    //   checkPending = setTimeout(() => {
    //     if (!Number.isInteger(value)) {
    //       callback(new Error('Please input digits'));
    //     } else {
    //       if (value < 18) {
    //         callback(new Error('Age must be greater than 18'));
    //       } else {
    //         callback();
    //       }
    //     }
    //   }, 1000);
    // };


    return {

      ruleForm: {
        age: '',
      },
      rules: {
        age: [
            { required: true, message: 'Please input the age' },
          { min: 0, max: 18, message: 'Age must be greater than 18' },

        ],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  
  methods:{

  },
  
  mounted() {
    
  }
}
</script>

<style scoped lang="sass">


</style>