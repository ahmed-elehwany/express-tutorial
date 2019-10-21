<template>
  <div>
    <v-data-table :headers="headers" :items="todos" sort-by="calories" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Todos</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.message" label="Message"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
        <v-icon small @click="deleteItem(item)">delete</v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
    <v-alert v-model="error" type="error" dismissible>{{ errorMsg}}</v-alert>
  </div>
</template>

<script>
import axios from "axios";
const url = "http://localhost:3000/todos";

export default {
  data: () => ({
    dialog: false,
    error: false,
    errorMsg: "",
    headers: [
      {
        text: "ID",
        align: "left",
        sortable: true,
        value: "id"
      },
      { text: "createdAt", value: "createdAt", sortable: true },
      { text: "message", value: "message" },
      { text: "Actions", value: "action", sortable: false }
    ],
    todos: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      axios
        .get(url)
        .then(response => {
          this.todos = response.data;
        })
        .catch(error => {
          this.showError(error);
        });
    },

    showError(message) {
      this.errorMsg = message;
      this.error = true;
    },

    editItem(item) {
      this.editedIndex = this.todos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItem(item) {
      if (confirm("Are you sure you want to delete this item?")) {
        let result;
        try {
          result = await axios.delete(url + "/" + item.id);
          if (result.status != 200) {
            this.showError(
              "Error: " + result.status + " " + result.data.message
            );
            return;
          }
        } catch (e) {
          this.showError(e);
          return;
        }

        if (result && result.data && result.data.success) {
          try {
            let temp = await axios.get(url);
            this.todos = temp.data;
          } catch (e) {
            this.showError(e);
          }
        } else {
          this.showError("error deleting item:" + result.data.msg);
        }
      }
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    async save() {
      let resp;
      if (this.editedIndex > -1) {
        let toBeDeleted = this.todos[this.editedIndex];
        try {
          resp = await axios.put(url + "/" + toBeDeleted.id, {
            message: this.editedItem.message
          });
          if (resp.status != 200) {
            this.showError("Error: " + resp.status + " " + resp.data.message);
          }
        } catch (e) {
          this.showError(e);
        }
      } else {
        try {
          resp = await axios.post(url, this.editedItem);
          if (resp.status != 200) {
            this.showError("Error: " + resp.status + " " + resp.data.message);
          }
        } catch (e) {
          this.showError(e);
        }
      }
      try {
        let temp = await axios.get(url);
        if (resp.status != 200) {
          this.showError("Error: " + resp.status + " " + resp.data.message);
        }
        this.todos = temp.data;
      } catch (e) {
        this.showError(e);
      }
      this.close();
    }
  }
};
</script>