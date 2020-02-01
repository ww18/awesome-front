<template>
  <el-form
    v-loading="loading"
    :model="ruleForm"
    status-icon
    :rules="rules"
    ref="ruleForm"
    label-width="80px"
    class="demo-ruleForm"
  >
    <div class="form-title">接口自动化测试系统</div>
    <el-form-item label="用户名" prop="username">
      <el-input
        type="text"
        v-model="ruleForm.username"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        type="password"
        v-model="ruleForm.password"
        autocomplete="off"
      ></el-input>
    </el-form-item>

    <div class="login-form-btn">
      <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
    </div>
  </el-form>
</template>
<script>
export default {
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ validator: validateName, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          let formdata = new FormData();
          formdata.append("username", this.ruleForm.username);
          formdata.append("password", this.ruleForm.password);
          let opt = {
            vm: this,
            method: "POST",
            url: "/api/login",
            data: formdata
          };
          window.API.requestData(opt).then(res => {
            if (res.data.islogin) {
              window.localStorage.setItem("isLogin", res.data.islogin);
              this.$router.push("/home");
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          this.$message.error("所填信息有误");
          return false;
        }
      });
    }
  }
};
</script>
<style>
.demo-ruleForm {
  margin: 0 auto;
  width: 500px;
}
.form-title {
  padding: 40px 0;
  text-align: center;
  font-size: 40px;
}
.el-button--primary {
  width: 200px;
}
.login-form-btn {
  padding: 20px 0 0 40px;
  text-align: center;
}
</style>
