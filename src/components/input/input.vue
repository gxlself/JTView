<template>
    <div class="chj-input">
        <div class="chj-input-title">
            {{ title }}<span v-show="required" class="chj-input-tips">*</span>
        </div>
        <div v-if="type === 'textarea'" class="chj-input-input">
            <textarea
                :rows="rows"
                :placeholder="placeholder"
                v-bind="$attrs"
                :value="value"
                :maxlength="maxNum"
                v-on="inputListeners"
            ></textarea>
        </div>
        <div v-else class="chj-input-input">
            <input
                :type="inputType"
                :placeholder="placeholder"
                v-bind="$attrs"
                :value="value"
                :class="{ error: errorTips }"
                :maxlength="maxNum"
                v-on="inputListeners"
                :autocomplete="autocomplete ? 'on' : 'new-password'"
            />
            <i class="iconfont iconfont-close"></i>
        </div>
        <div v-show="errorTips" class="chj-input-tips">{{ errorTips }}</div>
    </div>
</template>
<script>
import Input from './input.js'

export default Input
</script>
