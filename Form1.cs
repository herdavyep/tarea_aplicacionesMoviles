using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsApp1
{
    public partial class Form1 : Form
    {
        double primero;
        double segundo;
        double resultado;
        String operacion;

        public Form1()
        {
            InitializeComponent();


        }

        private void button13_Click(object sender, EventArgs e)
        {
            pantalla.Text = pantalla.Text + 6;
        }

        private void button4_Click(object sender, EventArgs e)
        {
            pantalla.Text = pantalla.Text + 1;
        }

        private void button14_Click(object sender, EventArgs e)
        {
            pantalla.Text = pantalla.Text + 3;
        }

        private void btnCero_Click(object sender, EventArgs e)
        {
            pantalla.Text = pantalla.Text + 0;
        }

        private void btnDos_Click(object sender, EventArgs e)
        {
            pantalla.Text = pantalla.Text + 2;
        }

        private void btnCuatro_Click(object sender, EventArgs e)
        {
            pantalla.Text = pantalla.Text + 4;
        }

        private void btnCinco_Click(object sender, EventArgs e)
        {
            pantalla.Text = pantalla.Text + 5;
        }

        private void btnSiete_Click(object sender, EventArgs e)
        {
            pantalla.Text = pantalla.Text + 7;
        }

        private void btnOcho_Click(object sender, EventArgs e)
        {
            pantalla.Text = pantalla.Text + 8;
        }

        private void btnNueve_Click(object sender, EventArgs e)
        {
            pantalla.Text = pantalla.Text + 9;
        }

        private void btnPunto_Click(object sender, EventArgs e)
        {
            pantalla.Text = pantalla.Text + ".";
        }

        private void btnSuma_Click(object sender, EventArgs e)
        {
            operacion = "+";
            primero = double.Parse(pantalla.Text);
            pantalla.Clear();
        }

        private void btnResta_Click(object sender, EventArgs e)
        {
            operacion = "-";
            primero = double.Parse(pantalla.Text);
            pantalla.Clear();
        }

        private void btnMultiplicacion_Click(object sender, EventArgs e)
        {
            operacion = "*";
            primero = double.Parse(pantalla.Text);
            pantalla.Clear();
        }

        private void btnDivision_Click(object sender, EventArgs e)
        {
            operacion = "/";
            primero = double.Parse(pantalla.Text);
            pantalla.Clear();
        }

        private void btnIgual_Click(object sender, EventArgs e)
        {
            segundo = double.Parse(pantalla.Text);
            switch (operacion)
            {
                case"+":
                    resultado = primero + segundo;
                    break;
                case "-":
                    resultado = primero - segundo;

                    break;
                case "*":
                    resultado = primero * segundo;

                    break;
                case "/":
                    resultado = primero / segundo;

                    break;
            }
            pantalla.Text = resultado.ToString();
        }

        private void btnBorrar_Click(object sender, EventArgs e)
        {
            pantalla.Clear();
        }
    }
}
