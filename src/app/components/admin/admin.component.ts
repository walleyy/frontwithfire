import {Component, OnDestroy, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatTableDataSource} from '@angular/material/table';
import { FormControl} from '@angular/forms';
import {UsersService} from '../../services/users.service';
import {AppError} from '../../common/AppError';
import {NotFoundError} from '../../common/NotFoundError';
import {BadInputError} from '../../common/BadInputError';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}
export interface Data {
  userId: string;
  id: number;
  title: string;
  body: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
  }, {
    position: 2,
    name: 'Helium',
    weight: 4.0026,
    symbol: 'He',
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`
  }, {
    position: 3,
    name: 'Lithium',
    weight: 6.941,
    symbol: 'Li',
    description: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,
        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
        lightest solid element.`
  }, {
    position: 4,
    name: 'Beryllium',
    weight: 9.0122,
    symbol: 'Be',
    description: `Beryllium is a chemical element with symbol Be and atomic number 4. It is a
        relatively rare element in the universe, usually occurring as a product of the spallation of
        larger atomic nuclei that have collided with cosmic rays.`
  }, {
    position: 5,
    name: 'Boron',
    weight: 10.811,
    symbol: 'B',
    description: `Boron is a chemical element with symbol B and atomic number 5. Produced entirely
        by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
        low-abundance element in the Solar system and in the Earth's crust.`
  }, {
    position: 6,
    name: 'Carbon',
    weight: 12.0107,
    symbol: 'C',
    description: `Carbon is a chemical element with symbol C and atomic number 6. It is nonmetallic
        and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
        to group 14 of the periodic table.`
  }, {
    position: 7,
    name: 'Nitrogen',
    weight: 14.0067,
    symbol: 'N',
    description: `Nitrogen is a chemical element with symbol N and atomic number 7. It was first
        discovered and isolated by Scottish physician Daniel Rutherford in 1772.`
  }, {
    position: 8,
    name: 'Oxygen',
    weight: 15.9994,
    symbol: 'O',
    description: `Oxygen is a chemical element with symbol O and atomic number 8. It is a member of
         the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
         agent that readily forms oxides with most elements as well as with other compounds.`
  }, {
    position: 9,
    name: 'Fluorine',
    weight: 18.9984,
    symbol: 'F',
    description: `Fluorine is a chemical element with symbol F and atomic number 9. It is the
        lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard
        conditions.`
  }, {
    position: 10,
    name: 'Neon',
    weight: 20.1797,
    symbol: 'Ne',
    description: `Neon is a chemical element with symbol Ne and atomic number 10. It is a noble gas.
        Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
        two-thirds the density of air.`
  },
];

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class AdminComponent implements  OnInit , OnDestroy{

  constructor(private usersService: UsersService , private route: ActivatedRoute, ) {}

  search = new FormControl('');
  columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
  expandedElement: PeriodicElement | null;
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  posts: any;
info: any;

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        const id = +params.getAll('id');
        console.log(id);
      }
    );

    this.usersService.getPost()
     .subscribe(response => {this.posts = (response as Data); },
       (error: Response) => {
     throw error;
   });
  }
  ngOnDestroy(): void {
    console.log('bye');
  }

  applyFilter(event: Event): any {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createPost(input: HTMLInputElement): any {
    const post = {input: input.value};
    console.log(post.input);
    this.posts.splice(100, 0, post.input);
    console.log(this.posts);
    input.value = '';
    const yal = 'title';
    this.usersService.makePost(post)
      .subscribe(response => {
      post[yal] = response.title;
    },
      ( error: AppError ) => {
        this.posts.splice(0, 1);
        if ( error instanceof BadInputError){
         // this.form.setErrors(error.originalError);
        } else {
        throw error;
        }
    });
  }

  postUpdate(user): any {
    this.usersService.updatePost(user)
      .subscribe(response => {console.log(response); },
        (error: AppError) => {
        this.posts.splice(0, 1);

        if ( error instanceof NotFoundError){
            alert('this post has already been  ');
          } else {
            throw error;
          }
      });
  }

  postDelete(user): any {
    this.usersService.deletePost(0)
      .subscribe(response => {
        const index = this.posts.indexOf(user);
        console.log(response.json);
        this.posts.splice(index, 1); },
        (error: AppError ) => {
        if ( error instanceof NotFoundError){
          alert('this post has already been  deleted');
        } else { throw error; }
    });
  }
}
