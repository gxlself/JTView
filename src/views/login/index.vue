<template>
    <div class="amp-login flex-cloumn flex-start">
        <login-header />
        <div class="amp-login-content margin-center lx-col-12 flex-align-center flex-row-reverse">
            <div class="amp-login-module">
                <h3>JT VIEW</h3>
                <div class="amp-login-form">
                    <chj-input
                        v-model="form.userName"
                        title="用户名"
                        placeholder="请输入用户名"
                        :autocomplete="false"
                    />

                    <chj-input
                        v-model="form.password"
                        title="密码"
                        inputType="password"
                        placeholder="请输入您的密码"
                        :autocomplete="false"
                    />

                    <div class="amp-login-remember flex-start flex-align-center">
                        <li-checkbox v-model="form.saveLogin">记住密码</li-checkbox>
                    </div>

                    <li-button class="amp-login-button" type="primary" @click="submitLogin">登录</li-button>
                </div>
            </div>
        </div>

        <div class="amp-login-mobile">
            <h3>JT VIEW</h3>
            <div class="amp-login-form">
                <chj-input
                    v-if="showMobileInput"
                    inputType="tel"
                    v-model="form.userName"
                    title="用户名"
                    placeholder="请输入用户名"
                    :autocomplete="false"
                    @input="mobileInput"
                    @blur="triggerScroll"
                />

                <chj-input
                    v-if="!showMobileInput"
                    v-model="form.password"
                    title="密码"
                    inputType="password"
                    placeholder="6-20位密码"
                    maxNum="20"
                    :autocomplete="false"
                    @input="passwordInput"
                />

                <li-button class="amp-login-button" :disabled="form.disbaled" type="primary" round  @click="nextTip">下一步</li-button>
            </div>
        </div>
    </div>
</template>

<script>
import index from './index.js'
export default index
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>

<style>
.amp-login-remember .li-checkbox__inner{
    width: 18px;
    height: 18px;
    border-radius: 50%;
}
.amp-login-remember .li-checkbox__inner::after{
    left: 6px;
    height: 10px;
}
.amp-login-remember .li-checkbox{
    color: #8C8985;
}
.amp-login-remember .li-checkbox__label{
    line-height: 28px;
}
.amp-login-button.li-button.is-round{
    border-radius: 45px;
}
</style>
