<template>
  <v-dialog
    v-model="dialog"
    :max-width="options.width"
    :style="{ zIndex: options.zIndex }"
    @keydown.esc="cancel"
  >
    <v-card>
      <v-toolbar dark :color="options.color" dense flat>
        <v-toolbar-title class="text-body-2 font-weight-bold grey--text">
          {{ title }}
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text
        v-show="!!message"
        class="pa-4 black--text"
        v-html="message"
      ></v-card-text>
      <v-card-actions class="pt-3">
        <v-spacer></v-spacer>
        <v-btn
          v-if="btn3.name"
          color="grey"
          text
          class="body-2 font-weight-bold"
          @click="clickBtn3"
        >
          {{ btn3.name }}
        </v-btn>
        <v-btn
          v-if="btn2.name"
          color="grey"
          text
          class="body-2 font-weight-bold"
          @click="clickBtn2"
        >
          {{ btn2.name }}
        </v-btn>
        <v-btn
          v-if="btn1.name"
          color="primary"
          class="body-2 font-weight-bold"
          outlined
          @click="clickBtn1"
        >
          {{ btn1.name }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ConfirmDlg",
  data() {
    return {
      dialog: false,
      resolve: null,
      reject: null,
      message: null,
      title: null,
      options: {
        color: "grey lighten-3",
        width: 400,
        zIndex: 200,
      },
      btn1: { name: "" },
      btn2: { name: "" },
      btn3: { name: "" },
    };
  },

  methods: {
    open(title, message, options = {}, btn1 = "", btn2 = "", btn3 = "") {
      this.dialog = true;
      this.title = title;
      this.message = message;

      // 合併 options，默認使用空對象，保證參數傳入時不會影響原始值
      this.options = { ...this.options, ...options };

      // 如果 btn1, btn2, btn3 是字符串，則設置按鈕名稱
      this.btn1 = typeof btn1 === "string" ? { name: btn1 } : { ...this.btn1, ...btn1 };
      this.btn2 = typeof btn2 === "string" ? { name: btn2 } : { ...this.btn2, ...btn2 };
      this.btn3 = typeof btn3 === "string" ? { name: btn3 } : { ...this.btn3, ...btn3 };

      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    clickBtn1() {
      this.resolve(this.btn1.name);
      this.dialog = false;
    },
    clickBtn2() {
      this.resolve(this.btn2.name);
      this.dialog = false;
    },
    clickBtn3() {
      this.resolve(this.btn3.name);
      this.dialog = false;
    },
    cancel() {
      this.resolve("用户取消操作");
      this.dialog = false;
    },
  },
};
</script>
