import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

const loadInterestRows = () => {
  const data = localStorage.getItem('interestRows');
  return data ? JSON.parse(data) : [{ id: 1, last_name: 'Laborte', first_name: 'Lovely Mae', age: 14 }];
};

const saveInterestRows = (rows) => {
  localStorage.setItem('interestRows', JSON.stringify(rows));
};

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
  },
  {
    id: 2,
    fullName: 'Jane Smith',
    previousYearTotal: 4500,
    jan_savings: 180,
    jan_shares: 90,
    jan_percentage: 2.8,
    feb_savings: 200,
    feb_shares: 95,
    feb_percentage: 3.1,
    // Add similar data for other months
    averagePercent: 2.95,
  }, {
    id: 3,
    fullName: '3',
    previousYearTotal: 4500,
    jan_savings: 180,
    jan_shares: 90,
    jan_percentage: 2.8,
    feb_savings: 200,
    feb_shares: 95,
    feb_percentage: 3.1,
    // Add similar data for other months
    averagePercent: 2.95,
  }, {
    id: 4,
    fullName: '4',
    previousYearTotal: 4500,
    jan_savings: 180,
    jan_shares: 90,
    jan_percentage: 2.8,
    feb_savings: 200,
    feb_shares: 95,
    feb_percentage: 3.1,
    // Add similar data for other months
    averagePercent: 2.95,
  }, {
    id: 5,
    fullName: '5',
    previousYearTotal: 4500,
    jan_savings: 180,
    jan_shares: 90,
    jan_percentage: 2.8,
    feb_savings: 200,
    feb_shares: 95,
    feb_percentage: 3.1,
    // Add similar data for other months
    averagePercent: 2.95,
  }, {
    id: 6,
    fullName: '6',
    previousYearTotal: 4500,
    jan_savings: 180,
    jan_shares: 90,
    jan_percentage: 2.8,
    feb_savings: 200,
    feb_shares: 95,
    feb_percentage: 3.1,
    // Add similar data for other months
    averagePercent: 2.95,
  }, {
    id: "7",
    fullName: '7',
    previousYearTotal: 4500,
    jan_savings: 180,
    jan_shares: 90,
    jan_percentage: 2.8,
    feb_savings: 200,
    feb_shares: 95,
    feb_percentage: 3.1,
    oct_savings: 200,
    oct_shares: 95,
    oct_percentage: 3.1,
    // Add similar data for other months
    averagePercent: 2.95,
  },
  {
    id: "45656754",
    fullName: '78979',
    previousYearTotal: 12,
    jan_savings: 180,
    jan_shares: 90,
    jan_percentage: 2.8,
    feb_savings: 200,
    feb_shares: 95,
    feb_percentage: 3.1,
    // Add similar data for other months
    averagePercent: 2.95,
  },
  {
    id: "9",
    fullName: 'asdfsadfd',
    previousYearTotal: 11,
    jan_savings: 180,
    jan_shares: 90,
    jan_percentage: 2.8,
    feb_savings: 200,
    feb_shares: 95,
    feb_percentage: 3.1,
    // Add similar data for other months
    averagePercent: 2.95,
  },
];

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),

  interestRows: [
    { id: 1, type: 'Savings', jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0, total: 0 },
    { id: 2, type: 'Shares', jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0, total: 0 },
    { id: 3, type: 'Loans', jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0, total: 0 },
  ],
  updateInterestRow: (updatedRow) =>
    set((state) => ({
      interestRows: state.interestRows.map((row) =>
        row.id === updatedRow.id ? updatedRow : row
      ),
    })),

  jsonData: null,
  setJsonData: (content) => {
    set({ jsonData: content });
    const interestData = updateInterests(content);
    localStorage.setItem('interestRows', JSON.stringify(interestData));
    set({ interestRows: interestData });
    initializeData(content);
  },

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

const initializeData = (content) => {
  updateDividends(content);
  updateInterests(content);
  updateLoans(content);
  updatePayments(content);
  updateSavings(content);
  updateShares(content);
};

const updateDividends = (content) => {
  console.log("Loading Dividends...");
};
const updateInterests = (content) => {
  console.log("Loading Interests...");
  const data = [];
  content.members.forEach((member) => {
    data.push(member);
  });
  return data;
};
const updateLoans = (content) => {
  console.log("Loading Loans...");
};
const updatePayments = (content) => {
  console.log("Loading Payments...");
};
const updateSavings = (content) => {
  console.log("Loading Savings...");
};
const updateShares = (content) => {
  console.log("Loading Shares...");
};
export default useStore;
