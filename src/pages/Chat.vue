<template>
  <div>
    <span class="status tag is-light is-success" v-if="connected"
      >Verbunden</span
    >
    <span class="status tag is-light is-danger" v-else>Nicht verbunden</span>
    <div class="section">
      <h1 class="title is-3">Chat</h1>

      <h2 class="subtitle is-5">Unbeantwortete Fragen</h2>

      <button @click="fetchMessages" class="button">Aktualisieren</button>

      <div>
        <div v-if="status === 'success'">
          <div v-for="(message, idx) in messages" :key="message._id" class="box msg">
            <span class="tag mb-2 created-at">
              vor {{ getMinutes(message.createdAt) }} Minuten
            </span>
            <button
              class="button is-small btn-answer"
              @click="setAnswered(message._id, idx)"
            >
              Als beantwortet markieren
            </button>
            <div>"{{ message.message }}"</div>
          </div>
        </div>

        <div v-else-if="status === 'loading'">Lädt...</div>
        <div v-else> Fragen konnten nicht geladen werden
          <button class="button" @click="fetchMessages">Erneut versuchen</button>
        </div>
      </div>

      <h2 class="subtitle is-5">Alle Fragen</h2>
      <button class="button" @click="showAll = !showAll">{{ showAll ? 'Ausblenden' : 'Einblenden' }}</button>
       <div v-if="showAll">
        <button class="button" @click="fetchMessages(true)">Fragen laden</button>
        <div v-if="status === 'success'">
          <div v-for="(message, idx) in allMessages" :key="message._id" class="box msg">
            <span class="tag mb-2 created-at">
              vor {{ getMinutes(message.createdAt) }} Minuten
            </span>
            <button 
              v-if="message.isAnswered"
              class="button is-small btn-answer"
              @click="setAnswered(message._id, idx, false)"
            >
              Als unbeantwortet markieren
            </button>
            <div>"{{ message.message }}"</div>
          </div>
        </div>

        <div v-else-if="status === 'loading'">Lädt...</div>
        <div v-else> Fragen konnten nicht geladen werden
          <button class="button" @click="fetchMessages(true)">Erneut versuchen</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import http from "../util/http";
export default {
  data() {
    return {
      connected: false,
      messages: [],
      allMessages: [],
      status: "loading",
      currentDate: new Date(),
      showAll: false,
    };
  },
  mounted() {
    this.$socket.on("connect", () => (this.connected = true));
    this.$socket.on("disconnect", () => (this.connected = false));
    this.connected = this.$socket.connected;
    this.fetchMessages();
    this.dateInterval = setInterval(
      () => (this.currentDate = new Date()),
      10000
    );
  },
  destroyed() {
    clearInterval(this.dateInterval);
  },
  methods: {
    async fetchMessages(includeAnswered = false) {
      const { status, data } = await http.get("/api/chat", {
        params: { includeAnswered },
      });
      if (status === 200) {
        if (includeAnswered)
          this.allMessages = data.data
        else {
          this.messages = data.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        }
        this.status = "success";
        console.log(data);
      } else {
        this.status = "failure";
      }
    },
    async setAnswered(messageID, idx, answered = true) {
      const { status, data } = await http.post(`api/chat/answer/${messageID}`, { answered });
      if (status === 200 && data.status === "success") {
        if (answered)
          this.messages.splice(idx, 1);
        else
          this.fetchMessages();
      } else {
        console.error({ status, data });
      }
    },
    getMinutes(dateString) {
      return Math.floor((this.currentDate - new Date(dateString)) / 1000 / 60);
    },
  },
  sockets: {
    newMessage(message) {
      this.messages.unshift(message)
    }
  },
};
</script>

<style scoped>
.title {
  margin-top: 0;
}
.status {
  position: absolute;
  right: 2em;
  top: 4em;
}
.msg {
  position: relative;
  padding-top: 3em !important;
}
.btn-answer {
  position: absolute;
  top: 1em;
  right: 1em;
}
.created-at {
  position: absolute;
  top: 1em;
  left: 1em;
}
</style>