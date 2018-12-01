<template>
	<div class="history_div">
		<table class="table table_right history_table" cellpadding="0" cellspacing="0" border="0">
      <thead class="clr_head_table">
        <tr>
          <th>DESCRIPTION</th>
          <th>AMOUNT</th>
          <th>DATE</th>
        </tr>
      </thead>
      <tbody class="clr_body_table">
      	<tr v-for="report in coinReports" v-if="report.credited==1 || report.debited==1" >
          <td>{{report.description}}</td>
          <td class="text-right">
            <span v-if="report.debited==1"><i class="fa fa-angle-down text-danger"></i> -</span><span v-else><i class="fa fa-angle-up text-success"></i></span>
            {{report.amount}}
          </td>
          <td>{{dateFormat(report.createdAt)}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
	props: {
		profile: Object,
    coinReports: Array
	},
  methods:{
    dateFormat(value){
      let date = new Date(value);
      return date.getFullYear() +'-'+ ((date.getMonth() + 1) > 9 ? '' : '0') + (date.getMonth() + 1) +'-'+ (date.getDate() > 9 ? '' : '0') + date.getDate();
    }
  }
}
</script>
<style>
.history_table .fa{ font-size:16px; font-weight:bold; float:left;}
.history_table td { vertical-align: middle; }
.history_table.table>tbody>tr:hover{ background-color: rgba(37,37,37,.6); }
.history_div{ max-height: 480px; overflow-x:auto; }
</style>