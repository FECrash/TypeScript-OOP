import { CoffeeOptions } from 'Coffee';
import Order from './order';
import { TAB_NAME } from './utils/constants';
import { qs } from './utils/helpers';
import View from './views/View';

export default class Controller {
  private mainView;
  private headerView;
  private modalView;
  private order;
  private orderId;

  constructor({ mainView, headerView, modalView }: { mainView: View; headerView: View; modalView: View }) {
    this.mainView = mainView;
    this.headerView = headerView;
    this.modalView = modalView;
    this.orderId = 0;
    this.order = new Order();
    this.subscribeViewEvents();
    this.bindedEvents();
    this.renderMainView();
  }

  private renderMainView() {
    this.mainView.show();
    this.headerView.show();
    this.modalView.show();
  }

  private subscribeViewEvents() {
    addEventListener('@add', this.addOrder.bind(this));
    addEventListener('@submit', this.handleSubmit.bind(this));
    addEventListener('@buttonClick', e => {
      this.handleTest((e as CustomEvent).detail);
    });
    addEventListener('@edit', e => {
      this.editOrder((e as CustomEvent).detail);
    });
  }

  private bindedEvents() {
    this.headerView.on('click', this.handleTab.bind(this));
    this.modalView.on('click', this.handleClose.bind(this));
  }

  private handleTest(currentElement: HTMLButtonElement) {
    const coffeeFilling = qs('.filling') as HTMLDivElement;
    const coffeeName = qs('.coffee_name') as HTMLHeadingElement;
    if (this.order.OrderItem.length === 0) {
      alert('주문내역이 없습니다 🥲');
      return;
    }

    if (currentElement) {
      currentElement.classList.remove('selected');
      coffeeFilling.classList.remove(currentElement.id);
    }

    coffeeFilling.classList.add(currentElement.id);
    currentElement.classList.add('selected');
    coffeeName.innerText = currentElement.innerText;
  }

  private Tabrender() {
    const tabName = TAB_NAME.INGREDIENT_MANAGEMENT;
    if (tabName === TAB_NAME.INGREDIENT_MANAGEMENT) {
      // TODO
    }

    this.renderMainView();
  }

  private editOrder(currentElement: HTMLDivElement) {
    const tableRow = currentElement.closest('.table-row');
    if (currentElement.closest('.edit-order')) {
      if (tableRow?.hasAttribute('contenteditable')) {
        alert('수정이 완료 되었습니다 😇');
        tableRow.removeAttribute('contenteditable');
        return;
      } else {
        tableRow?.setAttribute('contenteditable', 'true');
      }
    }
    if (currentElement.closest('.remove-order')) {
      const randomMenu = this.order.OrderItem;
      const filtered = randomMenu.filter(item => item.id !== currentElement.id);
      this.order.setOrderItem = filtered;
      this.renderOrderTable();
    }
  }

  private addOrder() {
    this.orderId++;
    this.order.addRandomOrder(this.orderId);
    this.Tabrender();
    this.renderOrderTable();
  }

  private handleSubmit() {
    const modalLayout = qs('.modal-layout') as HTMLDivElement;

    modalLayout.classList.toggle('hidden');
  }

  private handleTab() {
    const pageNav = qs('header') as HTMLHeadElement;
    pageNav.addEventListener('click', (event: MouseEvent) => {
      const $target = event.target as HTMLInputElement;
      if (!$target.matches('[type="radio"]')) return;

      alert('아직 준비되지 않았네요🥺');
      return;
    });
  }

  private handleClose() {
    const modalLayout = qs('.modal-layout') as HTMLDivElement;
    modalLayout.addEventListener('click', (event: MouseEvent) => {
      const $target = event.target as HTMLElement;
      if (!$target.matches('#close-icon')) return;
      modalLayout.classList.toggle('hidden');
    });
  }

  private renderOrderTable() {
    const $contents = `
  <div class="table-row header">
  <div class="cell">No</div>
  <div class="cell">메뉴명</div>
  <div class="cell">사이즈</div>
  <div class="cell">샷</div>
  <div class="cell">시럽</div>
  <div class="cell">ICE/HOT</div>
  <div class="cell">얼음 종류</div>
  <div class="cell">휘핑 크림</div>
  <div class="cell">엑스트라</div>
  <div class="cell">컵</div>
  <div class="cell">수정하기</div>
  <div class="cell">삭제하기</div>
</div>
${this.order.OrderItem.map(
  (item: CoffeeOptions) =>
    `
<div class="table-row">
<div class="cell" data-title="No">${item.id}</div>
<div class="cell" data-title="메뉴명">${item.menu}</div>
<div class="cell" data-title="사이즈">${item.size}</div>
<div class="cell" data-title="샷">${item.shot}</div>
<div class="cell" data-title="시럽">${item.syrup}</div>
<div class="cell" data-title="ICE/HOT">${item.iceOrHot}</div>
<div class="cell" data-title="얼음 종류">${item.ice}</div>
<div class="cell" data-title="휘핑 크림">${item.whippedCream}</div>
<div class="cell" data-title="엑스트라">${item.extra}</div>
<div class="cell" data-title="컵">${item.cup}</div>
<div class="cell" data-title="수정하기">
  <span class="edit-order"
    ><i id="${item.id}" class="fa-solid fa-pen"></i
    ></span>
</div>
<div class="cell" data-title="삭제하기">
  <span class="remove-order"
    ><i id="${item.id}" class="fa-solid fa-trash-can"></i
  ></span>
</div>
</div>
`,
).join('')}
  `;
    const $orderTable = qs('.table') as HTMLDivElement;
    $orderTable.innerHTML = $contents;
  }
}
