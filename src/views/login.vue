<template>
  <div class="container">
    <div class="loginBg">
<!--      <img src="../assets/image/leftBg.jpg" class="leftImg" />-->
    </div>
    <div class="loginWrap">
      <div class="logo">XX数字化平台</div>
      <div class="loginPanel">
        <div class="title">用户登录</div>
        <div class="inputWrap">
          <i class="if-font-UserOutlined"></i>
          <el-input
            placeholder="请输入用户名称"
            v-model="account"
            class="input"
            @blur="validateAccount"
            @input="inputValidate.accTip = ''"
            @keydown.enter="login"
          />
        </div>
        <div class="tip">{{ inputValidate.accTip }}</div>
        <div class="inputWrap">
          <i class="if-font-LockOutlined"></i>
          <el-input
            type="password"
            placeholder="请输入登录密码"
            v-model="pwd"
            class="input"
            show-password
            @blur="validatePwd"
            @input="inputValidate.pwdTip = ''"
            @keydown.enter="login"
          />
        </div>
        <div class="tip">{{ inputValidate.pwdTip }}</div>
        <label :class="['saveStatus', { active: saveStatus }]" @click="onSave">
          <span class="virtualCheckbox"></span>记住我
        </label>
        <div class="loginBtn" @click="login">登录</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { getLogin } from "@/utils/getData.js";
import { useRouter } from "vue-router";
const router = useRouter();


let saveStatus = ref(false);

let account = ref("");
let pwd = ref("");

let inputValidate = ref({
  accTip: "",
  pwdTip: "",
});

onMounted(() => {
  var savedAccount = localStorage.getItem("be-account");
  if (savedAccount && savedAccount.length) {
    account.value = savedAccount;
    saveStatus.value = true;
  }
});

const validateAccount = () => {
  if (!account.value.length) {
    inputValidate.value.accTip = "请输入登录账号";
  } else if (account.value.length < 5 || account.value.length > 20) {
    inputValidate.value.accTip = "用户名长度需要在5到20个字符";
  }
};

const validatePwd = () => {
  if (!pwd.value.length) {
    inputValidate.value.pwdTip = "请输入密码";
  }
};

const onSave = () => {
  saveStatus.value = !saveStatus.value;
  if (saveStatus.value) {
    if (account.value.length) {
      localStorage.setItem("be-account", account.value);
    }
  } else {
    localStorage.removeItem("be-account");
  }
};

watch(
  () => account.value,
  (val) => {
    if (val) {
      if (saveStatus.value) {
        localStorage.setItem("be-account", val);
      } else {
        localStorage.removeItem("be-account");
      }
    }
  },
);

const login = () => {
  getLogin({
    account: account.value,
    passwd: pwd.value,
  }).then((data) => {
    //
    if (data) {
      //保存数据
      localStorage.setItem("token", data.token);

      //跳转
      router.push("/");
    }
  });
};
</script>

<style scoped lang="scss">
.container {
  position: relative;
  padding-top: 0;
  width: 100%;
  height: 100vh;
  background: #0c132f;

  * {
    box-sizing: border-box;
  }

  .loginBg {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    .leftImg {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      height: 100%;
    }
  }

  .loginWrap {
    position: absolute;
    width: 45%;
    right: 5%;
    bottom: 25%;

    .logo {
      width: 680px;
      margin: 0 auto;
      text-align: center;
      letter-spacing: 6px;
      margin-bottom: 20px;
      background: linear-gradient(to right, #00a0f1, #00e8d0);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      height: 120px;
      line-height: 120px;
      font-size: 48px;
    }

    .loginPanel {
      height: 440px;
      width: 635px;
      padding: 40px 56px;
      margin: 0 auto;
      background: url("../assets/image/panel.png");

      .title {
        font-size: 32px;
        height: 48px;
        margin-bottom: 30px;
        line-height: 48px;
        letter-spacing: 7px;
        color: #00bff4;
        font-weight: lighter;
        text-align: center;
      }

      .inputWrap {
        position: relative;
        height: 56px;

        .input {
          background: transparent;
          width: 100%;
          height: 56px;
          outline: none;

          :deep(.el-input__wrapper) {
            background: transparent;
            box-shadow: none;
            padding-left: 60px;
            border: solid 3px #1970b3;

            &.is-focus {
              border-color: #1fa3f5;
            }

            input {
              line-height: 56px;
              color: #fff;
              font-size: 16px;
              letter-spacing: 2px;

              &::placeholder {
                color: #fff;
                letter-spacing: 2px;
                opacity: 0.6;
              }
            }

            .el-input__password {
              font-size: 24px;
              color: #1fa3f5;
            }
          }
        }

        i {
          position: absolute;
          font-size: 28px;
          color: #1fa3f5;
          left: 22px;
          top: 14px;
        }
      }

      .tip {
        line-height: 24px;
        height: 24px;
        color: #f56c6c;
        text-align: right;
      }

      .saveStatus {
        margin: 0 0 15px 0;
        height: 30px;
        display: inline-flex;
        align-items: center;
        color: #1fa3f5;
        font-size: 16px;
        cursor: pointer;
        .virtualCheckbox {
          position: relative;
          margin-right: 5px;
          width: 24px;
          height: 24px;
          display: inline-block;
          border: solid 3px #1970b3;
        }

        &.active {
          .virtualCheckbox {
            &:after {
              box-sizing: content-box;
              content: "";
              border: 3px solid #1970b3;
              border-left: 0;
              border-top: 0;
              height: 10px;
              left: 5px;
              position: absolute;
              top: 1px;
              transform: rotate(45deg);
              width: 6px;
            }
          }
        }
      }

      .loginBtn {
        height: 57px;
        border-radius: 3px;
        background-color: #20a3f5;
        cursor: pointer;
        font-size: 28px;
        letter-spacing: 7px;
        padding-left: 7px;
        text-align: center;
        line-height: 57px;
        color: #fff;
        font-weight: lighter;

        &:hover {
          background: #3eb1f8;
        }
      }
    }
  }
}

@media screen and (max-width: 1368px) {
  .loginWrap {
    transform: scale(0.75);
    transform-origin: left bottom;
  }
}
</style>
