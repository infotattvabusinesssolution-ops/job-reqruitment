import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: false,
  mobileMenuOpen: false,
  searchOpen: false,
  theme: 'light',
  loading: {
    global: false,
    page: false,
    modal: false,
  },
  modal: {
    isOpen: false,
    type: null,
    data: null,
  },
  toast: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    setMobileMenuOpen: (state, action) => {
      state.mobileMenuOpen = action.payload;
    },
    toggleSearch: (state) => {
      state.searchOpen = !state.searchOpen;
    },
    setSearchOpen: (state, action) => {
      state.searchOpen = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setGlobalLoading: (state, action) => {
      state.loading.global = action.payload;
    },
    setPageLoading: (state, action) => {
      state.loading.page = action.payload;
    },
    setModalLoading: (state, action) => {
      state.loading.modal = action.payload;
    },
    openModal: (state, action) => {
      state.modal.isOpen = true;
      state.modal.type = action.payload.type;
      state.modal.data = action.payload.data || null;
    },
    closeModal: (state) => {
      state.modal.isOpen = false;
      state.modal.type = null;
      state.modal.data = null;
    },
    setToast: (state, action) => {
      state.toast = action.payload;
    },
    clearToast: (state) => {
      state.toast = null;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  toggleMobileMenu,
  setMobileMenuOpen,
  toggleSearch,
  setSearchOpen,
  setTheme,
  setGlobalLoading,
  setPageLoading,
  setModalLoading,
  openModal,
  closeModal,
  setToast,
  clearToast,
} = uiSlice.actions;

export const selectSidebarOpen = (state) => state.ui.sidebarOpen;
export const selectMobileMenuOpen = (state) => state.ui.mobileMenuOpen;
export const selectSearchOpen = (state) => state.ui.searchOpen;
export const selectModal = (state) => state.ui.modal;
export const selectLoading = (state) => state.ui.loading;

export default uiSlice.reducer;