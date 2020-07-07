<template>
  <div class="dataTable">
    <table>
      <thead>
      <tr>
        <th>id</th>
        <th>name</th>
        <th>age</th>
        <th>phone</th>
        <th>email</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td v-for="(i, index) in item" :key="index">
          <input class="readonly_false" :class="[readOnly ? '' : 'editable']" type="text" v-model="i.value">
          <input class="readonly_true" type="text" disabled :value="i.value">
        </td>
        <td>
          <button class="btn_edit" @click="editRow(item, $event)">Edit</button>
          <button class="btn_save" @click="save(item, $event)">Save</button>
          <button @click="remove(item)">Remove</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import {EDIT_ITEM, GET_DATA, REMOVE_ITEM} from "../store/types";

  export default {
    name: 'Table',
    data () {
      return {
        dataItems: [],
        readOnly: true,
        editedItem: null
      }
    },
    computed: {
      items () {
        return this.$store.getters.get_items;
      }
    },
    methods: {
      editRow(item, event) {
        event.target.parentNode.parentNode.classList.add('readonly')
        this.editedItem = item
        this.readOnly = false
      },
      remove(item) {
        this.$store.dispatch(REMOVE_ITEM, item)
      },
      save(item, event) {
        event.target.parentNode.parentNode.classList.remove('readonly')
        let obj = {}
        let keys = ['id', 'name', 'age', 'phone', 'email']
        let values = []
        item.map( (i, index) => {
          values.push(Object.values(i)[1])
        })
        obj.id = values[0]
        obj.name = values[1]
        obj.age = values[2]
        obj.phone = values[3]
        obj.email = values[4]
        this.$store.dispatch(EDIT_ITEM, obj)
      },
      getData () {
        this.$store.dispatch(GET_DATA)
      }
    },
    mounted() {
      this.getData();
    }
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,500,300,700');
  body{
    background: -webkit-linear-gradient(left, #25c481, #25b7c4);
    background: linear-gradient(to right, #25c481, #25b7c4);
    font-family: 'Roboto', sans-serif;
  }
  th{
    padding: 20px 15px;
    text-align: left;
    font-weight: 500;
    font-size: 12px;
    color: #fff;
    text-transform: uppercase;
  }
  td{
    padding: 15px;
    text-align: left;
    vertical-align:middle;
    font-weight: 300;
    font-size: 12px;
    color: #fff;
    border-bottom: solid 1px rgba(255,255,255,0.1);
    input {
      border: 0;
      background: transparent;
      color: #fff;
      &.editable {
        border: 1px solid #fff;
        background: #fff;
        color: #000;
      }
    }
  }
  table{
    width:100%;
    table-layout: fixed;
  }
  .readonly_true {
    display: block;
  }
  .readonly_false {
    display: none;
  }
  .btn_edit {
    display: block;
  }
  .btn_save {
    display: none;
  }
  .readonly {
    .readonly_true {
      display: none;
    }
    .readonly_false {
      display: block;
    }
    .btn_edit {
      display: none;
    }
    .btn_save {
      display: block;
    }
  }
</style>
