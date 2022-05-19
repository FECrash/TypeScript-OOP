import { Component, OrderListItem } from '@/components';
import { Order } from '@/domain';
import { OrderListView } from './OrderListView';

export class OrderList extends Component {
  private $orderTable!: HTMLElement;
  private $orderButton!: HTMLElement;
  private $listItemElements: OrderListItem[] = [];

  protected bindElements() {
    this.$orderTable = this.$container.querySelector('#order-table') as HTMLElement;
    this.$orderButton = this.$container.querySelector('.order-button') as HTMLElement;
  }

  protected bindListeners() {
    this.cafe
      .getEventListener()
      .orderRemoved(({ order }) => {
        this.removeOrderListItem(order.getId());
      })
      .beforeServing(({ serving }) => {
        this.removeOrderListItem(serving.getOrderId());
      })
      .menuButtonClick(async ({ button }) => {
        this.addOrder(await this.cafe.createRandomOrder(button.getMenuId()));
      });
  }

  protected bindEvents() {
    this.$orderButton.addEventListener('click', async e => {
      e.preventDefault();
      this.addOrder(await this.cafe.createRandomBeverageOrder());
    });
  }

  private removeOrderListItem(orderId: string) {
    const $el = this.findOrderListItemElement(orderId);
    this.removeListItemElement($el);
    this.updateListItemNo();
  }

  private addOrder(order: Order): void {
    const listItem = this.createListItem(order);

    this.addListItem(listItem);
    this.updateListItemNo();

    this.cafe.getEventDispatcher().orderAdded({ order });
  }

  private removeListItemElement(orderListItem: OrderListItem | undefined) {
    if (!orderListItem) {
      return;
    }

    this.findOrderListItemElement(orderListItem.getDataId())?.remove();
    this.removeOrderListItemElement(orderListItem);
  }

  private findOrderListItemElement(orderId: string) {
    return this.$listItemElements.find($listItem => $listItem.getDataId() === orderId);
  }

  private removeOrderListItemElement(orderListItem: OrderListItem) {
    this.$listItemElements = this.$listItemElements.filter(o => o !== orderListItem);
  }

  private createListItem(order: Order): OrderListItem {
    const $orderListItem = this.createComponent<OrderListItem>('cafe-order-list-item');
    $orderListItem.setOrder(order);

    return $orderListItem;
  }

  private addListItem(orderListItem: OrderListItem) {
    this.$orderTable.appendChild(orderListItem);
    this.$listItemElements.push(orderListItem);
  }

  private updateListItemNo() {
    this.$listItemElements.forEach((orderListItem, index) => {
      //TODO 수정이 필요함
      setTimeout(() => {
        orderListItem.setNo(index + 1);
      }, 10);
    });
  }

  protected view() {
    return OrderListView();
  }
}
