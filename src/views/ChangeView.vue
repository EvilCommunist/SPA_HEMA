<script>
import { changeLogic } from './Scripts/changeLogic';

export default {
  name: 'ChangeView',
  ...changeLogic,
};
</script>

<template>
  <div class="store">
    <div v-if="product">
      <div class="vertical-text top decor">{{ displayCategory }}</div>
      <div class="vertical-text bottom decor">{{ displayCategory }}</div>
      <div class="container flex">
        <section id="product_view">
          <section class="current_section">
            <span class="cur_sub">
              Каталог > {{ product.cathegory }} > {{ product.name }}
            </span>
          </section>
          <input v-model="product.name" id="edit_name" />
          <div class="slider">
            <div class="main-image">
              <img :src="currentImage" :alt="product.name" />
            </div>
            <div class="thumbnails">
              <div
                v-for="(image, index) in tempImages"
                :key="index"
                class="thumbnail"
                :class="{ active: currentImageIndex === index }"
                @click="changeImage(index)"
              >
                <img :src="image" :alt="`Thumbnail ${index + 1}`" />
                
              </div>
              <button @click.stop="removeImage(index)" class="remove_image">Х</button>
            </div>
            <input type="file" @change="handleImageUpload" accept="image/*" multiple id="image_upload">
          </div>
        </section>

        <section id="character_and_cart">
          <section id="character">
            <span id="cha">Характеристики</span>
            <ul>
              <li v-for="(char, index) in product.characteristics" :key="index">
                <input v-model="product.characteristics[index]" class="edit_char">
                <button @click="removeCharacteristic(index)" class="remove_char">Удалить</button>
              </li>
              <li>
                <button @click="addCharacteristic" class="add_char_btn">+ Добавить характеристику</button>
              </li>
            </ul>
            
            <div class="edit_section">
              <label>Цена:</label>
              <input v-model.number="product.price" type="number" class="edit-price-input">
            </div>
            
            <div class="edit_section">
              <label>Количество на складе:</label>
              <input v-model.number="product.remain" type="number" class="edit-stock-input">
            </div>
            
            <div class="edit_section">
              <label>Описание:</label>
              <textarea v-model="product.description" class="edit_desc"></textarea>
            </div>
          </section>
          
          <div class="action_btns">
            <button @click="saveChanges" class="save_btn">Сохранить</button>
            <button @click="cancelEditing" class="cancel_btn">Отмена</button>
          </div>
        </section>
      </div>
    </div>
    <div v-else-if="loading">
      <p>Загрузка...</p>
    </div>
    <div v-else>
      <p>Товар не найден.</p>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "./Styles/storeStyle.less";
@import "./Styles/cardStyle.less";
@import "./Styles/changeStyles.less";
</style>