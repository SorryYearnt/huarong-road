export function Coordinate2Index(RowPosition, ColumnPosition) {
	return RowPosition * 4 + ColumnPosition;
}

const OxO = [1, 1], OxT = [1, 2], TxO = [2, 1], TxT = [2, 2];
class Mode {
	constructor(N) {
		if (N >= 1) {
			this.GuanYu = TxO;
			if (N >= 2) {
				this.ZhangFei = TxO;
				if (N >= 3) {
					this.ZhaoYun = TxO;
					if (N >= 4) {
						this.MaChao = TxO;
						if (N >= 5) {
							this.HuangZhong = TxO;
						}
					}
				}
			}
		}
	}
	CaoCao = TxT;
	GuanYu = OxT;
	ZhangFei = OxT;
	ZhaoYun = OxT;
	MaChao = OxT;
	HuangZhong = OxT;
	Soldier = OxO;
}
export const Modes = [...new Array(6)].map((element, index) => new Mode(index));
export function Mode2ClassName(Mode) {
	switch (Mode) {
		case OxO:
			return ' OxO ';
		case OxT:
			return ' OxT ';
		case TxO:
			return ' TxO ';
		case TxT:
			return ' TxT ';
		default:
			return '';
	}
}
/* 本代码由SorryYearnt编写，转载请注明出处。This code is written by SorryYearnt. Please indicate the source for reprinting. このコードはSorryYearntによって書かれており、転載は出典を明記してください。 */

const Character2Piece = new Map([
	['CaoCao', 'CaoCao'],
	['GuanYu', 'GuanYu'],
	['ZhangFei', 'ZhangFei'],
	['ZhaoYun', 'ZhaoYun'],
	['MaChao', 'MaChao'],
	['HuangZhong', 'HuangZhong'],
	['Soldier1', 'Soldier'],
	['Soldier2', 'Soldier'],
	['Soldier3', 'Soldier'],
	['Soldier4', 'Soldier']
]);
export function C2P(key) {
	return Character2Piece.get(key);
}
