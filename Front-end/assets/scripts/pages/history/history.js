var TableColumns = [
    {
        label: 'Nội dung thay đổi',
        key: 'detail'
    },
    {
        label: 'Ngày',
        key: 'createdAt',
        type:'datetime'
    }
    ,
    {
        label: 'Thời gian',
        key: 'createdAt',
        type:'time'
    },
    {
        label: 'Nhân viên',
        key: 'createdBy'
    }
]
const maDetail = localStorage.getItem('maDetail')

document.addEventListener("DOMContentLoaded",async () => {
    await checkIsUpdateResume()
    await checkIsCreatedLabor()
    await checkIsCreatedSalary()
});
