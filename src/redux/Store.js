import { configureStore } from "@reduxjs/toolkit";

import LayoutStateSlice from "./LayoutState";
import OperationStateSlice from "./OperationState";
import PositionStateSlice from "./PositionState";

const Store = configureStore({
	reducer: {
		LayoutState: LayoutStateSlice.reducer,
		OperationState: OperationStateSlice.reducer,
		PositionState: PositionStateSlice.reducer
	},
	/* 本代码由SorryYearnt编写，转载请注明出处。This code is written by SorryYearnt. Please indicate the source for reprinting. このコードはSorryYearntによって書かれており、転載は出典を明記してください。 */
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		serializableCheck: false
	})
});

export default Store;
