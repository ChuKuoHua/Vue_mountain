<template>
  <div>
    <nav aria-label="Page navigation example" class="py-3">
    <ul class="pagination justify-content-center">
      <li
        class="page-item"
        :class="{ 'disabled': pages.current_page === 1 }"
      >
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="changePage(pages.current_page -1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        v-for="(item, index) in pages.total_pages"
        :key="index"
        class="page-item"
        :class="{ 'active': item === pages.current_page }"
      >
        <a
          class="page-link"
          href="#"
          @click.prevent="changePage(item)"
        >{{ item }}</a>
      </li>
      <li
        class="page-item"
        :class="{ 'disabled': pages.current_page === pages.total_pages }"
      >
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="changePage(pages.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
  </div>
</template>
<script>
export default {
  props: {
    pages: {
      type: Object,
      required: true,
    },
  },
  methods: {
    changePage(page) {
      this.$emit('changePage', page);
    },
  },
};
</script>
