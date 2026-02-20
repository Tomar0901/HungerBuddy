import Swal from 'sweetalert2';
import './styles.css';

export const Toast = Swal.mixin({
  toast: true,
  position: 'bottom',
  iconColor: 'white',
  customClass: {
    popup: 'colored-toast',
  },
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
});
