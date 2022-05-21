import { BaseId, ExtraIngredientRecord, SelectedOption } from 'dto';
import { Comparable, ExtraSelectable } from 'ObjectInterface';

export default class ExtraSelection implements BaseId, ExtraSelectable, Comparable<ExtraSelection> {
  private _selected: string;
  private readonly _type: string;
  constructor(private readonly extraIngredientRecord: ExtraIngredientRecord) {
    this._type = this.extraIngredientRecord.type;
    this._selected = this.extraIngredientRecord.currentSelected;
  }

  get id() {
    return this.extraIngredientRecord.id;
  }

  equal(there: ExtraSelection) {
    return this.getType() === there.getType() && this.getSelected() === there.getSelected();
  }
  getSelected() {
    return this._selected;
  }
  getType() {
    return this._type;
  }

  select(option: SelectedOption) {
    if (this._type !== option.type) {
      throw new Error('타입이 같아야 합니다.');
    }
    if (!this.extraIngredientRecord.selectableList.includes(option.selected)) {
      throw new Error('옵션에 선택할 수 있는 내용은 선택가능한 목록에 존재해야 합니다.');
    }
    this._selected = option.selected;
  }
}
