import {createSlice} from '@reduxjs/toolkit';

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState: {
    isFilterApplied: false,
    sortBy: [
      {
        title: 'Date',
        key: 'updatedAt',
      },
      {
        title: 'Relevance',
        key: 'relevance',
      },
      {
        title: 'Min salary',
        key: 'salaryMin',
      },
      {
        title: 'Max salary',
        key: 'salaryMax',
      },
    ],
    filterReset: {
      positionId: null,
      position: null,
      companyCategory: null,
      companyCategoryId: null,
      cityId: null,
      city: null,
      ageMin: null,
      ageMax: null,
      genderId: null,
      gender: null,
      experienceMin: null,
      experienceMax: null,
      scheduleId: null,
      schedule: null,
      salaryMin: null,
      salaryMax: null,
      sortBy: 'updatedAt',
      sortOrder: 'DESC',
      orderBy: null,
      pageSize: 20,
      pageNum: 1,
    },
    filter: {
      positionId: null,
      position: null,
      companyCategory: null,
      companyCategoryId: null,
      cityId: null,
      city: null,
      ageMin: null,
      ageMax: null,
      genderId: null,
      gender: null,
      experienceMin: null,
      experienceMax: null,
      scheduleId: null,
      schedule: null,
      salaryMin: null,
      salaryMax: null,
      sortBy: 'updatedAt',
      orderBy: null,
      sortOrder: 'DESC',
      pageSize: 20,
      pageNum: 1,
    },
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = {
        position: action.payload.position,
        positionId: action.payload.position ? action.payload.position.id : null,
        companyCategoryId: action.payload.companyCategory
          ? action.payload.companyCategory.id
          : null,
        companyCategory: action.payload.companyCategory,
        cityId: action.payload.city ? action.payload.city.id : null,
        city: action.payload.city,
        ageMin: action.payload.ageMin,
        ageMax: action.payload.ageMax,
        genderId: action.payload.gender ? action.payload.gender.id : null,
        gender: action.payload.gender,
        experienceMin: action.payload.experienceMin,
        experienceMax: action.payload.experienceMax,
        scheduleId: action.payload.schedule ? action.payload.schedule.id : null,
        schedule: action.payload.schedule,
        salaryMin: action.payload.salaryMin,
        salaryMax: action.payload.salaryMax,
        sortBy: action.payload.orderBy
          ? action.payload.orderBy.key
          : 'updatedAt',
        orderBy: action.payload.orderBy,
        sortOrder: 'DESC',
        pageSize: 20,
        pageNum: 1,
      };
    },
    setFilterApplied: (state, action) => {
      state.isFilterApplied = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setFilter, setFilterApplied} = jobsSlice.actions;

export default jobsSlice.reducer;
