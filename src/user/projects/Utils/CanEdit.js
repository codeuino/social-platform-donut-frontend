import moment from 'moment'

export const canEditCheck = (editingLimit, createdAt) => {
  if (editingLimit !== "Always") {
    const now = moment().format("YYYY-MM-DD hh:mm:ss");
    const allowedTill = moment(createdAt).add(editingLimit, "minutes").format("YYYY-MM-DD hh:mm:ss");
    if (now < allowedTill) {
      console.log('yes can edit')
      return true;
    }
    console.log("can not edit");
    return false;
  }
  console.log('always edit allowed!!');
  return true
}