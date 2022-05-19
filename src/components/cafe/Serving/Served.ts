import { Component } from '@/components';
import { ServedView } from './ServedView';
import { Serving } from '@/domain';
import { ServedItem } from '@/components/cafe/Serving/Item/ServedItem';

export class Served extends Component {
  private $makedTable!: HTMLElement;
  private $servedList: ServedItem[] = [];

  protected bindElements() {
    this.$makedTable = this.$container.querySelector('#maked-table') as HTMLElement;
  }

  protected bindListeners() {
    this.cafe.getEventListener().afterServing(({ serving }) => {
      this.add(serving);

      //TODO 리팩토링 필요
      setTimeout(() => {
        this.updateListNo();
      }, 10);
    });
  }

  private add(serving: Serving) {
    const servingElement = this.createComponent<ServedItem>('cafe-served-item');
    servingElement.setServing(serving);

    this.$servedList.push(servingElement);
    this.$makedTable.appendChild(servingElement);
  }

  private updateListNo() {
    this.$servedList.forEach((servedItem, index) => {
      servedItem.setNo(index);
    });
  }

  protected view() {
    return ServedView();
  }
}
