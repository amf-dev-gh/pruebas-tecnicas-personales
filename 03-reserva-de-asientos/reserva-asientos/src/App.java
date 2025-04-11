import java.util.Scanner;

public class App {

	@SuppressWarnings("resource")
	public static void main(String[] args) throws Exception {

		String[][] mapaAsientos = new String[10][10];
		Scanner input = new Scanner(System.in);

		for (int fila = 0; fila < 9; fila++) {
			for (int asiento = 0; asiento < 9; asiento++) {
				mapaAsientos[fila][asiento] = "L";
			}
		}
		System.out.println("----> Bienvenido al sistema de reservas <----");

//		ver asientos al iniciar
		boolean ejecutar = true;
		while (ejecutar) {
			int fila = 0;
			int asiento = 0;

			System.out.println("¿Desea ver los asientos disponibles? Ingrese S para SI y cualquier letra para NO");
			String verAsientos = input.next();
			if (verAsientos.equalsIgnoreCase("S"))
				mostrarAsientos(mapaAsientos);

//			validar datos ingresados para filas y asientos
			boolean correcto = false;
			while (correcto != true) {
				System.out.println("\nIngrese la fila y asiento a reservar");
				System.out.print("Fila entre 0 y 9:");
				fila = input.nextInt();
				System.out.print("Asiento entre 0 y 9:");
				asiento = input.nextInt();
				if (fila <= 9 && fila >= 0) {
					if (asiento <= 9 && asiento >= 0) {
						correcto = true;
					} else {
						System.out.println("Valor incorrecto de asiento. Vuelva a intentar");
					}
				} else {
					System.out.println("Valor incorrecto de fila. Vuelva a intentar");
				}
			}

//			si el asiento esta libre se reserva si no no hace nada
			if (mapaAsientos[fila][asiento].equalsIgnoreCase("L")) {
				mapaAsientos[fila][asiento] = "X";
				System.out.println("Asiento reservado satisfactoriamente");
			} else {
				System.out.println("El asiento ya se encuentra reservado");
			}

//			confirmacion para volver a ejecutar en caso de nueva reserva o asiento reservado
			System.out.println("¿Desea hacer otra reserva? Ingrese S para SI y cualquier letra para NO");
			String repetir = input.next();
			if (!repetir.equalsIgnoreCase("S")) {
				ejecutar = false;
			}
		}
	}

//	----------------- Métodos internos --------------------

	static void mostrarAsientos(String[][] mapa) {
		for (int fila = 0; fila < 9; fila++) {
			System.out.print("Fila " + fila + " ");
			for (int asiento = 0; asiento < 9; asiento++) {
				System.out.print("[" + mapa[fila][asiento] + "]");
			}
			System.out.println("");
		}
	}
}