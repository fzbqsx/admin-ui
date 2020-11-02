<template>
  <a-card style="margin-top: 15px">
    <a-table :columns="columns" :data-source="data">
      <a slot="name" slot-scope="text">{{ text }}</a>
      <div slot="action" slot-scope="{text, record}">
        <a @click="clickToView(record.key)">
          <a-icon type="delete" />删除1
        </a>
      </div>
    </a-table>
  </a-card>

</template>
<script>


export default {
  name: "orderMessge",
  data() {
    return {
      columns : [
        {
          title: '订单编号',
          dataIndex: 'id',
        },
        {
          title: '标题',
          dataIndex: 'orderNmae',
          ellipsis: true,
        },
        {
          title: '所属用户',
          dataIndex: 'userName',
        },
        {
          title: '时间',
          dataIndex: 'createTime',
        },
        {
          title: '状态',
          dataIndex: 'status',
          sorter: 'true',
        },
        // {
        //   title: '操作',
        //   dataIndex: 'action',
        // },
        {
          title: '操作',
          scopedSlots: { customRender: 'action' }}

      ],

      data : [
        {
          key: '1',
          id: '111',
          orderNmae: '订单1',
          userName: 'aa1',
          createTime: '2020-10-29 15:34:32',
          status: '1'
        },
        {
          key: '2',
          id: '222',
          orderNmae: '订单2',
          userName: 'aa2',
          createTime: '2020-10-30 05:51:32',
          status: '2'
        },
        {
          key: '3',
          id: '333',
          orderNmae: '订单3',
          userName: 'aa3',
          createTime: '2020-10-29 12:35:54',
          status: '1'
        },
      ],
    };
  },
  methods:{
    clickToView(key){
      console.log(key)
    }
  },

  mounted() {

  }
};
</script>
