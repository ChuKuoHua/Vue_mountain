import Swal from 'sweetalert2';

export default (
  Swal.mixin({
    toast: true,
    showConfirmButton: false,
    timer: 2000,
    padding: '1em',
    position: 'bottom-start',
  })
);
