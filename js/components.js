//Creating the Vue object.
const rootComponent = {
  data() {
    return {
      pollingId: null,
      selectedMail: {},
      forwardedMail: {},
      flags: {'mail-list': true,
              'mail-reader': false,
              'input-address': false,
              'mail-composer': false,
              'mail-forwarder': false,
              'mail-replier': false},
      mails:[{from: "Alice", subject: "Hello darkness"},
                {from: "Bob", subject: "My old friend"},],
      addressBook: []
    }
  },
  // This method is called when the vue application is mounted into a DOM element.
  mounted: function() {
  },
  // Before unmounting the vue application you can clear the setInterval to stop the polling over the mail list.
  beforeUnmount: function() {
  },

  methods: {
    selectMailForComponent: function (mail, component) {
      console.log("[selectMailForComponent] Selected email is: " + mail.subject);
      this.selectedMail = mail;
      this.showComponent(component);
    },
  }, //end methods
  template:
    `
    <nav-bar />
    `
} //end options

//==== Navigation Bar ==========================================================
const navigationBarComponent = {
  name: "nav-bar",
  props: ["mails"],
  emits: ['titleSelected'],
  data: function () {
    return {
      items: [{title: "Home", link: "#"}, // Here i explain how i am and my story
              {title: "Projects", link: "#"}, // Here the projects i've worked on
              {title: "Experience", link: "#"}, // Here my working experience
              {title: "Hobbies", link: "#"}, // Here my hobbies and activities
              {title: "Contact", link: "#"}, // Here how to contact me
            ],
    }
  },
  methods: {

  },
  template:
    `<div id="nav-bar">
      <ul>
        <li v-for="item in items" @click="$emit('titleSelected', item)">
         {{ item.title }}
        </li>
      </ul>
    </div>`
};

const app = Vue.createApp(rootComponent);
app.component('nav-bar', navigationBarComponent);
const vm = app.mount("#app");
