package javaapplication7;

import java.util.Scanner;

public class Airlinereservation {

    static final int maxbook = 100;
    static String pasname[] = new String[maxbook];
    static String filghtnum[] = new String[maxbook];
    static String phonenum[] = new String[maxbook]; 
    static int bookcount = 0;

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int choice;
        do {
            System.out.println("\n__AirLineReservationSystems__");
            System.out.println("1) Insert Booking");
            System.out.println("2) View Booking");
            System.out.println("3) Update Booking");
            System.out.println("4) Delete Booking");
            System.out.println("5) Exit");
            System.out.print("Enter your choice: ");
            choice = in.nextInt();
            in.nextLine(); // clear buffer

            switch (choice) {
                case 1:
                    insertBooking(in);
                    break;
                case 2:
                    viewBooking();
                    break;
                case 3:
                    updateBooking(in);
                    break;
                case 4:
                    deleteBooking(in);
                    break;
                case 5:
                    System.out.println("Goodbye!");
                    break;
                default:
                    System.out.println("Please try again.");
            }
        } while (choice != 5);
    }

    static void insertBooking(Scanner in) {
        if (bookcount >= maxbook) {
            System.out.println("Booking full");
            return;
        }
        System.out.print("Enter passenger name: ");
        pasname[bookcount] = in.nextLine();
        System.out.print("Enter flight number: ");
        filghtnum[bookcount] = in.nextLine();
        System.out.print("Enter phone number: ");
        phonenum[bookcount] = in.nextLine();
        int seatNumber = bookcount + 1;
        bookcount++;
        System.out.println("Booking added. Your seat number is: " + seatNumber);
    }

    static void viewBooking() {
        if (bookcount == 0) {
            System.out.println("No bookings.");
            return;
        }
        for (int i = 0; i < bookcount; i++) {
            System.out.println("Seat: " + (i + 1) + " | Name: " + pasname[i] + ", Flight: " + filghtnum[i] + ", Phone: " + phonenum[i]);
        }
    }

    static void updateBooking(Scanner in) {
        viewBooking();//to display all current bookings
        if (bookcount == 0) return;//check if there any bookings
        System.out.print("Enter booking number to update: ");//ask the user to enter the booking num they want to update
        int index = in.nextInt() - 1;
        if (index >= 0 && index < bookcount)//checks if the entered index is valid
        {
            in.nextLine();
            System.out.print("Enter new name: ");
            pasname[index] = in.nextLine();
            System.out.print("Enter new flight number: ");
            filghtnum[index] = in.nextLine();
            System.out.print("Enter new phone number: ");
            phonenum[index] = in.nextLine();
            System.out.println("Booking updated.");
        } else {
            System.out.println("Invalid booking number.");
        }
    }

    static void deleteBooking(Scanner in) {
        viewBooking();
        if (bookcount == 0) return; /*end function if current booking is 0*/
        System.out.print("Enter booking number to delete: ");
        int index = in.nextInt() - 1;
        if (index >= 0 && index < bookcount) {  /*run only if the index(input-1) is valid, not  less than 0 and be less than bookcount*/
            in.nextLine(); // clear buffer
            System.out.print("Are you sure you want to delete this booking? (yes/no): ");
            String confirm = in.nextLine();
            if (confirm.equalsIgnoreCase("yes")) {
                for (int i = index; i < bookcount - 1; i++) { /*run loop while index = i and i less than bookcount -1 to replace only up to 2nd last index*/
                    pasname[i] = pasname[i + 1]; /*fill the current index with the index next to it*/
                    filghtnum[i] = filghtnum[i + 1];
                    phonenum[i] = phonenum[i + 1];
                }
                bookcount--; /*reduce bookcount by 1*/
                System.out.println("Booking deleted.");
            } else {
                System.out.println("Deletion cancelled.");
            }
        } else {
            System.out.println("Invalid booking number.");
        }
    }
}

