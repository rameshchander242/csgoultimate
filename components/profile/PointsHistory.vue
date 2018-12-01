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
      	<tr v-for="report in pointReports" v-if="report.credited==1 || report.debited==1" >
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
    pointReports: Array
	},
  methods:{
    dateFormat(value){
      let date = new Date(value);
      return date.getFullYear() +'-'+ ((date.getMonth() + 1) > 9 ? '' : '0') + (date.getMonth() + 1) +'-'+ (date.getDate() > 9 ? '' : '0') + date.getDate();
    }
  }
}
</script>