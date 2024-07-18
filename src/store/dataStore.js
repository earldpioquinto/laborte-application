import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';


const loadMemberData = () => {
  const data = localStorage.getItem('memberData');
  return data ? JSON.parse(data) : [];
};

const saveMemberData = (data) => {
  localStorage.setItem('memberData', JSON.stringify(data));
};

const sampleDividendRows = [
  {
    id: 1,
    fullName: 'John Doe',
    previousYearTotal: 5000,
    jan_savings: 200,
    jan_shares: 100,
    jan_percentage: 3,
    feb_savings: 210,
    feb_shares: 110,
    feb_percentage: 3.5,
    // Add similar data for other months
    averagePercent: 3.25,
  }
];

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),

  interestRows: [
    { id: 1, type: 'Savings', jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0, total: 0 },
    { id: 2, type: 'Shares', jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0, total: 0 },
    { id: 3, type: 'Loans', jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0, total: 0 },
    { id: 4, type: 'Payments', jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0, total: 0 },
  ],
  updateInterestRow: (updatedRow) =>
    set((state) => ({
      interestRows: state.interestRows.map((row) =>
        row.id === updatedRow.id ? updatedRow : row
      ),
    })),

  initializeInterestRows: (memberId, year) => set((state) => {
    const interestRows = [
      { id: 1, type: 'Savings', jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0, total: 0 },
      { id: 2, type: 'Shares', jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0, total: 0 },
      { id: 3, type: 'Loans', jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0, total: 0 },
      { id: 4, type: 'Payments', jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0, total: 0 },
    ];

    const member = state.memberData.find((member) => member.id === memberId);
    if (member) {
      ['savings', 'shares', 'loans', 'payments'].forEach(type => {
        try {
        if (member.records[type]) {
          member.records[type].forEach(record => {
            if (record.year === year) {
              const month = new Date(record.year, record.month - 1).toLocaleString('default', { month: 'short' }).toLowerCase();
              const row = interestRows.find(row => row.type.toLowerCase() === type);
              if (row) {
                row[month] += parseFloat(record.value);
                row.total += parseFloat(record.value);
              }
            }
          });
        }
      } catch (e) {
        console.warn(e);
      }
      });
    }

    return { interestRows };
  }),

  memberData: loadMemberData(),
  addOrUpdateMember: (member) => set((state) => {
    const existingIndex = state.memberData.findIndex((m) => m.id === member.id);
    const duplicateIndex = state.memberData.findIndex(
      (m) => m.first_name === member.first_name && m.last_name === member.last_name && m.id !== member.id
    );

    if (duplicateIndex !== -1) {
      return { duplicateFound: true };
    }

    let updatedMemberData;
    if (existingIndex !== -1) {
      updatedMemberData = [...state.memberData];
      updatedMemberData[existingIndex] = member;
    } else {
      updatedMemberData = [...state.memberData, member];
    }
    saveMemberData(updatedMemberData);
    return { memberData: updatedMemberData, duplicateFound: false };
  }),
  deleteMember: (id) => set((state) => {
    const updatedMemberData = state.memberData.filter((member) => member.id !== id);
    saveMemberData(updatedMemberData);
    return { memberData: updatedMemberData };
  }),
  clearDuplicateFlag: () => set({ duplicateFound: false }),
  duplicateFound: false,

  memberInfo: {
    memberId: '',
    firstName: '',
    lastName: '',
    membershipDate: '',
    membershipFee: '',
  },
  updateMemberInfo: (newInfo) => set((state) => ({ memberInfo: { ...state.memberInfo, ...newInfo } })),

  updateMemberRecord: (memberId, newRecord, recordType) => set((state) => {
    const memberIndex = state.memberData.findIndex(member => member.id === memberId);
    if (memberIndex !== -1) {
      const member = state.memberData[memberIndex];

      if (!member.records) {
        member.records = {};
      }

      if (!member.records[recordType]) {
        member.records[recordType] = [];
      }

      const existingRecordIndex = member.records[recordType].findIndex(
        record => record.month === newRecord.month && record.year === newRecord.year
      );

      if (existingRecordIndex !== -1) {
        member.records[recordType][existingRecordIndex] = newRecord;
      } else {
        member.records[recordType].push(newRecord);
      }

      const updatedMemberData = [...state.memberData];
      updatedMemberData[memberIndex] = member;
      saveMemberData(updatedMemberData);

      return { memberData: updatedMemberData };
    }
  }),

  loanData: [
    { id: 1, month: 'January', year: "2023", payment: 1000, interest: 200, principal: 800, remainingBalance: 5000, paid: true },
    { id: 2, month: 'February', year: "2023", payment: 1000, interest: 180, principal: 820, remainingBalance: 4180, paid: false },
    { id: 3, month: 'March', year: "2023", payment: 1000, interest: 160, principal: 840, remainingBalance: 3340, paid: false },
    { id: 4, month: 'April', year: "2023", payment: 1000, interest: 140, principal: 860, remainingBalance: 2480, paid: false },
  ],
  updateLoanData: (updatedRow) => set((state) => ({
    loanData: state.loanData.map(row =>
      row.id === updatedRow.id ? { ...row, ...updatedRow } : row
    ),
  })),


  dividendRows: sampleDividendRows,
  updateDividendRow: (updatedRow) =>
    set((state) => ({
      dividendRows: state.dividendRows.map((row) =>
        row.id === updatedRow.id ? updatedRow : row
      ),
    })),
}));

export default useStore;
