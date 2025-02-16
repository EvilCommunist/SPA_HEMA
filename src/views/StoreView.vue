<script>
import { storeLogic } from './Scripts/storeLogic';

export default {
  name: 'StoreView',
  ...storeLogic,
};
</script>


<template>
  <main>
    <!--Секция каталога с товарами-->
    <section class="store">
      <div class="vertical-text top decor">{{ leftText }}</div>
      <div class="vertical-text bottom decor">{{ rightText }}</div>
      <div class="container flex">
        <!--Боковое меню с типами товара-->
        <aside id="menu">
          <span id="nameSection" @click.prevent="resetCategory">Каталог</span>
          <hr>
          <ul>
            <li>
              <span id="sub_section">Защита</span>
              <ul>
                <li><a href="#" @click.prevent="setCategory('Защита головы')">Защита головы</a></li>
                <li><a href="#" @click.prevent="setCategory('Защита тела')">Защита тела</a></li>
                <li><a href="#" @click.prevent="setCategory('Защита рук')">Защита рук</a></li>
                <li><a href="#" @click.prevent="setCategory('Защита ног')">Защита ног</a></li>
              </ul>
            </li>
            <hr>
            <li>
              <span id="sub_section">Оружие</span>
              <ul>
                <li><a href="#" @click.prevent="setCategory('Древковое')">Древковое</a></li>
                <li><a href="#" @click.prevent="setCategory('Колющее')">Колющее</a></li>
                <li><a href="#" @click.prevent="setCategory('Режущее оружие')">Режущее оружие</a></li>
                <li><a href="#" @click.prevent="setCategory('Луки')">Луки</a></li>
                <li><a href="#" @click.prevent="setCategory('Тренировочное')">Тренировочное</a></li>
              </ul>
            </li>
            <hr>
            <li>
              <span id="sub_section">Комплекты</span>
              <ul>
                <li><a href="#" @click.prevent="setCategory('Русские комплекты')">Русские комплекты</a></li>
                <li><a href="#" @click.prevent="setCategory('Азиатские комплекты')">Азиатские комплекты</a></li>
                <li><a href="#" @click.prevent="setCategory('Европейские комплекты')">Европейские комплекты</a></li>
                <li><a href="#" @click.prevent="setCategory('Арабские комплекты')">Арабские комплекты</a></li>
              </ul>
            </li>
          </ul>
        </aside>
        <section>
          <div v-if="loading">Загрузка...</div>
          <div v-else id="catalog">
            <section class="current_section">
              <span class="cur">{{ currentSection }}</span><br>
              <span class="cur_sub" @click="toggleMenu">{{ currentSubSection }}</span>
              <!--Выпадающее меню для маелньких экранов-->
              <div v-if="isMenuVisible && isMobile" class="dropdown-menu">
                <ul>
                  <li><a href="#" @click.prevent="resetCategory">Весь ассортимент</a></li>
                  <li>
                    <span class="sub_section">Защита</span>
                    <ul>
                      <li><a href="#" @click.prevent="setCategory('Защита головы')">Защита головы</a></li>
                      <li><a href="#" @click.prevent="setCategory('Защита тела')">Защита тела</a></li>
                      <li><a href="#" @click.prevent="setCategory('Защита рук')">Защита рук</a></li>
                      <li><a href="#" @click.prevent="setCategory('Защита ног')">Защита ног</a></li>
                    </ul>
                  </li>
                  <li>
                    <span class="sub_section">Оружие</span>
                    <ul>
                      <li><a href="#" @click.prevent="setCategory('Древковое')">Древковое</a></li>
                      <li><a href="#" @click.prevent="setCategory('Колющее')">Колющее</a></li>
                      <li><a href="#" @click.prevent="setCategory('Режущее оружие')">Режущее оружие</a></li>
                      <li><a href="#" @click.prevent="setCategory('Луки')">Луки</a></li>
                      <li><a href="#" @click.prevent="setCategory('Тренировочное')">Тренировочное</a></li>
                    </ul>
                  </li>
                  <li>
                    <span class="sub_section">Комплекты</span>
                    <ul>
                      <li><a href="#" @click.prevent="setCategory('Русские комплекты')">Русские комплекты</a></li>
                      <li><a href="#" @click.prevent="setCategory('Азиатские комплекты')">Азиатские комплекты</a></li>
                      <li><a href="#" @click.prevent="setCategory('Европейские комплекты')">Европейские комплекты</a></li>
                      <li><a href="#" @click.prevent="setCategory('Арабские комплекты')">Арабские комплекты</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </section>
            <!--Карточка товара-->
            <div v-for="product in filteredProducts" :key="product.id" class="product">
              <img :src="product.main_pic" :alt="product.name" @click="openProduct(product)" />
              <p @click="openProduct(product)" class="prodName">{{ product.name }}</p>
              <span class="descript">{{ product.description }}</span>
              <div class="prod_bottom">
                Цена: {{ product.price }} руб.
                <button @click="addToCart(product)">В корзину</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  </main>
</template>

<style scoped lang="less">
@import "./Styles/storeStyle.less";
</style>