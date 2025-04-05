<script>
import { addProductLogic } from './Scripts/addLogic';

export default {
  name: 'AddView',
  ...addProductLogic
};
</script>

<template>
  <div class="store">
    <div v-if="product">
      <div class="vertical-text top decor">Добавить новый</div>
      <div class="vertical-text bottom decor">Добавить новый</div>
      <div class="container flex">
        <section id="product_view">
          <section class="current_section">
            <span class="cur_sub">
              Каталог > Добавить новый
            </span>
          </section>
          <input v-model="product.name" id="edit_name" placeholder="Название товара" />
          <div class="slider">
            <div class="main-image">
              <img :src="currentImage" alt="Превью изображения" v-if="currentImage" />
              <div v-else class="empty-image">Добавьте изображение</div>
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
                <button @click.stop="removeImage(index)" class="remove_image">Х</button>
              </div>
            </div>
            <input type="file" @change="handleImageUpload" accept="image/*" multiple id="image_upload">
          </div>
        </section>

        <section id="character_and_cart">
          <section id="character">
            <span id="cha">Характеристики</span>
            <ul>
              <li v-for="(char, index) in product.characteristics" :key="index">
                <input v-model="product.characteristics[index]" class="edit_char" placeholder="Характеристика">
                <button @click="removeCharacteristic(index)" class="remove_char">Удалить</button>
              </li>
              <li>
                <button @click="addCharacteristic" class="add_char_btn">+ Добавить характеристику</button>
              </li>
            </ul>
            
            <div class="edit_section">
              <label>Категория:</label>
              <select v-model="product.cathegory" class="edit_cat">
                <option value="">Выберите категорию</option>
                <option value="Защита головы">Защита головы</option>
                <option value="Защита тела">Защита тела</option>
                <option value="Защита рук">Защита рук</option>
                <option value="Защита ног">Защита ног</option>
                <option value="Древковое оружие">Древковое оружие</option>
                <option value="Колющее оружие">Колющее оружие</option>
                <option value="Режущее оружие">Режущее оружие</option>
                <option value="Луки">Луки</option>
                <option value="Тренировочное оружие">Тренировочное оружие</option>
                <option value="Русские комплекты">Русские комплекты</option>
                <option value="Азиатские комплекты">Азиатские комплекты</option>
                <option value="Европейские комплекты">Европейские комплекты</option>
                <option value="Арабские комплекты">Арабские комплекты</option>
              </select>
            </div>
            
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
              <textarea v-model="product.description" class="edit_desc" placeholder="Описание товара"></textarea>
            </div>
          </section>
          
          <div class="action_btns">
            <button @click="saveProduct" class="save_btn">Добавить товар</button>
            <button @click="cancelEditing" class="cancel_btn">Отмена</button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "./Styles/storeStyle.less";
@import "./Styles/cardStyle.less";
@import "./Styles/changeStyles.less";
@import "./Styles/addStyles.less";
</style>