const STORAGE_KEY = 'student_data_v1';
function exportCSV() {
    const list = getFiltered();
    if (!list.length) return toast('没有可导出的数据', 'error');
    const header = ['学号', '姓名', '性别', '年龄', '班级', '电话', '邮箱'];
    const rows = list.map(s => [s.id, s.name, s.gender, s.age, s.className, s.phone || '', s.email || '']);
    const bom = '\uFEFF';
    const csv = bom + [header, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `学生信息_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
    toast('导出成功');
}